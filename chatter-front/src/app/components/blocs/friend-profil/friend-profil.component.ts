import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  EventEmitter,
  input,
  InputSignal,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { GetMeModel, UserModel } from '../../../models/user.model';
import { MatIcon } from '@angular/material/icon';
import { DialogService } from '../../../services/dialog.service';
import { LoaderComponent } from '../../loader/loader.component';
import { environment } from '../../../../env';
import { DatePipe, NgStyle } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { FriendService } from '../../../services/friend.service';
import { PopupService } from '../../../services/popup.service';
import {
  FriendModel,
  FriendRelationModel,
} from '../../../models/friend-relation.model';
import {
  FriendStatusIndexEnum,
  FriendStatusInvitation,
} from '../../../models/enums/friend-status-invitation.enum';
import { FriendFormatservice } from '../../../services/friend-format.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-friend-profil',
  standalone: true,
  imports: [MatIcon, LoaderComponent, DatePipe, NgStyle],
  templateUrl: './friend-profil.component.html',
  styleUrl: './friend-profil.component.scss',
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          height: '26vh',
        }),
      ),
      state(
        'closed',
        style({
          height: '0vh',
        }),
      ),
      transition('closed => open', [animate('3s')]),
      transition('open => closed', [animate('3s')]),
    ]),
  ],
})
export class FriendProfilComponent {
  public getMe: InputSignal<GetMeModel> = input.required<GetMeModel>();

  @Output() refreshGetMeEvent = new EventEmitter<any>();
  public userSelected: InputSignal<UserModel> = input.required<UserModel>();
  public isFriend: WritableSignal<boolean> = signal(false);
  public friendStatus: WritableSignal<FriendStatusInvitation> = signal(
    FriendStatusInvitation.NOTFRIEND,
  );

  public isProfilSelected: InputSignal<boolean> = input.required<boolean>();
  public onOpenComponent: WritableSignal<boolean> = signal(true);
  public friendUserRelation: WritableSignal<FriendRelationModel | null> =
    signal(null);

  public myFriends: WritableSignal<FriendModel[]> = signal([]);
  public myRejectedFriends: WritableSignal<FriendModel[]> = signal([]);
  public myPendingByMeFriends: WritableSignal<FriendModel[]> = signal([]);
  public myPendingReceivedFriends: WritableSignal<FriendModel[]> = signal([]);

  protected apiUrl = environment.apiUrl;

  protected readonly FriendStatusInvitation = FriendStatusInvitation;

  constructor(
    public dialogService: DialogService,
    private friendService: FriendService,
    private popupService: PopupService,
    private friendFormatservice: FriendFormatservice,
  ) {
    effect(
      async () => {
        if (!this.getMe() || !this.userSelected()) {
          return;
        }

        this.myFriends.set(
          this.friendFormatservice.getFriendListAccepted(this.getMe().friends),
        );
        this.myRejectedFriends.set(
          this.friendFormatservice.getFriendListRejected(this.getMe().friends),
        );
        this.myPendingByMeFriends.set(
          this.friendFormatservice.getFriendListPendingSendByMe(
            this.getMe().friends,
          ),
        );
        this.myPendingReceivedFriends.set(
          this.friendFormatservice.getFriendListPendingReceived(
            this.getMe().friends,
          ),
        );

        switch (this.userSelected().id) {
          case this.myFriends().find(
            (friend) => friend.friendRelation.id === this.userSelected().id,
          )?.friendRelation.id:
            this.friendStatus.set(FriendStatusInvitation.ACCEPTED);
            break;

          case this.myPendingByMeFriends().find(
            (friend) => friend.friendRelation.id === this.userSelected().id,
          )?.friendRelation.id:
            this.friendStatus.set(FriendStatusInvitation.PENDINGSENDBYME);
            break;

          case this.myPendingReceivedFriends().find(
            (friend) => friend.friendRelation.id === this.userSelected().id,
          )?.friendRelation.id:
            this.friendStatus.set(FriendStatusInvitation.PENDINGRECEIVED);
            break;

          case this.myRejectedFriends().find(
            (friend) => friend.friendRelation.id === this.userSelected().id,
          )?.friendRelation.id:
            this.friendStatus.set(FriendStatusInvitation.REJECTED);
            break;

          default:
            this.friendStatus.set(FriendStatusInvitation.NOTFRIEND);
            break;
        }

        //Remove ca, voir status de l'amitiée via mon objet friend du getMe
        this.friendService
          .getFriend(this.getMe()!.id, this.userSelected().id)
          .subscribe((friendRelation) => {
            this.friendUserRelation.set(friendRelation);
            this.friendUserRelation()?.status ===
            FriendStatusInvitation.ACCEPTED
              ? this.isFriend.set(true)
              : this.isFriend.set(false);
          });
      },
      { allowSignalWrites: true },
    );
  }

  public openDialog(
    user: UserModel,
    friendRelation?: FriendRelationModel,
  ): void {
    this.dialogService.openDialog(user, friendRelation);
  }

  toggle() {
    this.onOpenComponent.update((value) => !value);
  }

  invitationFriend(userModel: UserModel) {
    const currentUserId = this.getMe().id;
    this.friendService.sendFriendRequest(currentUserId, userModel.id).subscribe(
      (response) => {
        console.log('Invitation envoyée avec succès:', response);
        this.refreshGetMeEvent.emit();
        this.popupService.openSnackBar('Invitation envoyée', 'lawngreen');
      },
      (error) => {
        console.error("Erreur lors de l'envoi de l'invitation:", error);
        this.popupService.openSnackBar("Echec de l'invitation", 'red');
      },
    );
  }

  acceptFriend() {
    this.friendService
      .acceptFriendRequest(this.friendUserRelation()!.id)
      .subscribe(
        (response) => {
          console.log('Invitation acceptée avec succès:', response);
          this.refreshGetMeEvent.emit();
        },
        (error) => {
          console.error("Erreur lors de l'acceptation de l'invitation:", error);
        },
      );
  }

  deleteFriend() {
    this.friendService
      .removeFriend(this.getMe().id, this.userSelected().id)
      .subscribe(
        (response) => {
          console.log('Suppression réussit:', response);
          this.refreshGetMeEvent.emit();
        },
        (error) => {
          console.error('Erreur lors de la suppression:', error);
        },
      );
    this.popupService.openSnackBar('Amitié finie!', 'green');

    this.refreshGetMeEvent.emit();
  }

  /* async friendStatus(getMeId: string, friendSelectedId: string) {
    this.friendService.getFriend(getMeId, friendSelectedId).subscribe(
      (response) => {
        console.log('Ami trouvé:', response);
      },
      (error) => {
        console.error("Erreur lors de la recherche de l'ami:", error);
      },
    );
  }*/
}
