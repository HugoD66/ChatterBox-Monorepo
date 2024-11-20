import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  EventEmitter,
  input,
  InputSignal,
  OnDestroy,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { GetMeModel, UserModel } from '../../../models/user.model';
import { MatIcon } from '@angular/material/icon';
import {
  DialogService,
  SettingsOrRemoveFriendDialogData,
} from '../../../services/dialog.service';
import { LoaderComponent } from '../../loader/loader.component';
import { environment } from '../../../../env';
import { DatePipe, NgStyle } from '@angular/common';
import { FriendService } from '../../../services/friend.service';
import { PopupService, SimpleMessage } from '../../../services/popup.service';
import {
  FriendModel,
  FriendRelationModel,
} from '../../../models/friend-relation.model';
import { FriendStatusInvitation } from '../../../models/enums/friend-status-invitation.enum';
import { FriendFormatservice } from '../../../services/friend-format.service';
import { Router } from '@angular/router';
import { MatTooltip } from '@angular/material/tooltip';
import { DialogTypeEnum } from '../../../enum/dialog.type.enum';
import { Subscription } from 'rxjs';
import { FormatPluralizePipe } from '../../../pipe/FormatPluralizePipe';
import {
  transitionBetweenUsersAnimation,
  TransitionSwitchUserEnum,
} from '../../../services/animation/animation';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-friend-profil',
  standalone: true,
  imports: [
    MatIcon,
    LoaderComponent,
    DatePipe,
    NgStyle,
    MatTooltip,
    FormatPluralizePipe,
  ],
  templateUrl: './friend-profil.component.html',
  styleUrl: './friend-profil.component.scss',
  animations: [transitionBetweenUsersAnimation],
})
export class FriendProfilComponent implements OnDestroy {
  public getMe: InputSignal<GetMeModel> = input.required<GetMeModel>();
  public userSelected: InputSignal<UserModel> = input.required<UserModel>();
  public isProfilSelected: InputSignal<boolean> = input.required<boolean>();
  public onOpenComponent: WritableSignal<boolean> = signal(true);
  public isDiscussionPanel: WritableSignal<boolean> = signal(false);
  public friendUserRelation: WritableSignal<FriendRelationModel | null> =
    signal(null);
  public userSelectedFriendSituation: WritableSignal<FriendStatusInvitation> =
    signal(FriendStatusInvitation.NOTFRIEND);
  public mutualFriends: WritableSignal<number> = signal(0);
  public userListRefrehNeeded: Subscription;

  public transitionState: WritableSignal<TransitionSwitchUserEnum> = signal(
    TransitionSwitchUserEnum.CHANGESTART,
  );

  @Output() panelOpening = new EventEmitter<any>();
  @Output() refreshGetMeEvent = new EventEmitter<any>(false);

  protected apiUrl = environment.apiUrl;
  protected readonly FriendStatusInvitation = FriendStatusInvitation;

  constructor(
    public dialogService: DialogService,
    private friendService: FriendService,
    private popupService: PopupService,
    private friendFormatservice: FriendFormatservice,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.checkDiscussionPanel();
    effect(
      async () => {
        this.startTransition();

        if (!this.getMe() || !this.userSelected()) {
          return;
        }
        this.panelOpening.emit(true);

        const getMyFriends: FriendModel[] =
          this.friendFormatservice.getAllFriends(this.getMe().friends);

        const getMyFriendsAccepted: FriendModel[] =
          this.friendFormatservice.getFriendListAccepted(this.getMe().friends);

        const getFriendListOfMyFriend: FriendModel[] = await this.friendService
          .getAcceptedFriends(this.userSelected().id)
          .toPromise();

        this.userSelectedFriendSituation.set(
          this.friendFormatservice.findFriendSituation(
            this.userSelected(),
            getMyFriends,
          ),
        );

        this.mutualFriends.set(
          await this.friendFormatservice.countMutualFriends(
            getMyFriendsAccepted,
            getFriendListOfMyFriend,
          ),
        );
      },
      { allowSignalWrites: true },
    );

    effect(
      async () => {
        if (!this.getMe() || !this.userSelected()) {
          return;
        }
        const relation = await this.friendService
          .getFriend(this.getMe().id, this.userSelected().id)
          .toPromise();
        if (!relation) {
          return;
        }
        this.friendUserRelation.set(relation);
      },
      { allowSignalWrites: true },
    );

    this.userListRefrehNeeded =
      this.friendService.userListRefreshNeeded.subscribe(() => {
        this.refreshGetMeEvent.emit();
      });
  }

  private checkDiscussionPanel() {
    this.isDiscussionPanel.set(this.router.url.includes('/room/private/'));
  }

  public ngOnDestroy(): void {
    if (this.userListRefrehNeeded) {
      this.userListRefrehNeeded.unsubscribe();
    }
  }

  public openDialog(
    user: UserModel,
    friendRelation: FriendRelationModel,
    type: 'remove' | 'settings',
  ): void {
    const dialogData = new SettingsOrRemoveFriendDialogData(
      user,
      friendRelation,
    );
    type === 'remove'
      ? this.dialogService.openDialog(
          this.getMe(),
          dialogData,
          DialogTypeEnum.REMOVE_FRIEND,
        )
      : this.dialogService.openDialog(
          this.getMe(),
          dialogData,
          DialogTypeEnum.SETTINGS_FRIEND,
        );
  }

  toggle() {
    this.onOpenComponent.update((value) => !value);
  }

  public startTransition() {
    this.transitionState.set(TransitionSwitchUserEnum.CHANGESTART);
    this.cdr.detectChanges();
    setTimeout(() => {
      this.transitionState.set(TransitionSwitchUserEnum.CHANGEFINAL);
      this.cdr.detectChanges();
    }, 100);
  }

  invitationFriend(userModel: UserModel) {
    const currentUserId = this.getMe().id;
    this.friendService.sendFriendRequest(currentUserId, userModel.id).subscribe(
      () => {
        this.refreshGetMeEvent.emit();
        const popupMessage = new SimpleMessage(
          `Invitation envoyée à ${userModel.pseudo}`,
          'green',
        );
        this.popupService.openSimpleMessageSnackBar(popupMessage);
      },
      () => {
        const popupMessage = new SimpleMessage("Echec de l'invitation", 'red');
        this.popupService.openSimpleMessageSnackBar(popupMessage);
      },
    );
  }

  async acceptFriend() {
    this.friendService
      .acceptFriendRequest(this.friendUserRelation()!.id)
      .subscribe(
        () => {
          this.refreshGetMeEvent.emit();
        },
        () => {},
      );
  }

  public async goToUserConversation(userId?: string) {
    this.router.navigate([`/room/private/${userId}`]);
  }

  shareUserselected() {
    let absoluteUrl = this.router.serializeUrl(
      this.router.createUrlTree([
        `${environment.urlDev}/friend/add/${this.userSelected().id}`,
      ]),
    );
    absoluteUrl = absoluteUrl.split('').slice(1).join('');

    navigator.clipboard
      .writeText(absoluteUrl)
      .then(() => {
        const popupMessage = new SimpleMessage(
          'URL copiée dans le presse-papiers !',
          'green',
        );
        this.popupService.openSimpleMessageSnackBar(popupMessage);
      })
      .catch(() => {
        const popupMessage = new SimpleMessage(
          "Erreur lors de la copie de l'URL",
          'red',
        );
        this.popupService.openSimpleMessageSnackBar(popupMessage);
      });

    return;
  }
}
