import {
  ChangeDetectionStrategy,
  Component,
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
import { FriendRelationModel } from '../../../models/friend-relation.model';
import { FriendStatusInvitation } from '../../../models/enums/friend-status-invitation.enum';
import { FriendFormatservice } from '../../../services/friend-format.service';
import { RoomService } from '../../../services/room.service';
import { Router } from '@angular/router';

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

  public isProfilSelected: InputSignal<boolean> = input.required<boolean>();
  public onOpenComponent: WritableSignal<boolean> = signal(true);
  public friendUserRelation: WritableSignal<FriendRelationModel | null> =
    signal(null);

  public userSelectedFriendSituation: WritableSignal<FriendStatusInvitation> =
    signal(FriendStatusInvitation.NOTFRIEND);

  protected apiUrl = environment.apiUrl;

  protected readonly FriendStatusInvitation = FriendStatusInvitation;

  constructor(
    public dialogService: DialogService,
    private friendService: FriendService,
    private popupService: PopupService,
    private friendFormatservice: FriendFormatservice,
    private roomService: RoomService,
    private router: Router,
  ) {
    effect(
      async () => {
        if (!this.getMe() || !this.userSelected()) {
          return;
        }

        this.userSelectedFriendSituation.set(
          this.friendFormatservice.findFriendSituation(
            this.userSelected(),
            this.friendFormatservice.getAllFriends(this.getMe().friends),
          ),
        );
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

  openChat(userId: string, participantId: string) {
    this.roomService.getRoomByUser({ userId, participantId }).subscribe(
      (room) => {
        this.router.navigate([`/room/private/${room.id}`]);
      },
      (error) => {
        console.error('Erreur lors de la recherche de la room:', error);
      },
    );

    return;
  }

  shareUserselected() {
    const absoluteUrl = this.router.serializeUrl(
      this.router.createUrlTree([`/friend/add/${this.userSelected().id}`]),
    );
    console.log(absoluteUrl);
    this.popupService.openSnackBar('Profil copié', 'green');

    return;
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
