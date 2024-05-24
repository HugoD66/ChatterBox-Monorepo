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
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { FriendService } from '../../../services/friend.service';
import { PopupService } from '../../../services/popup.service';

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
  protected apiUrl = environment.apiUrl;

  constructor(
    public dialogService: DialogService,
    private friendService: FriendService,
    private popupService: PopupService,
  ) {
    effect(
      () => {
        this.getMe().friends!.forEach((friend: UserModel) => {
          if (this.userSelected().id === friend.id) {
            console.log(this.userSelected().id);
            this.isFriend.set(true);
            this.friendStatus(this.getMe().id, this.userSelected().id);
          } else {
            this.isFriend.set(false);
          }
        });
      },
      { allowSignalWrites: true },
    );
  }

  public openDialog(user: UserModel): void {
    this.dialogService.openDialog(this.userSelected());
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

  deleteFriend(userModel: UserModel) {
    this.refreshGetMeEvent.emit();
  }

  async friendStatus(getMeId: string, friendSelectedId: string) {
    this.friendService.getFriend(getMeId, friendSelectedId).subscribe(
      (response) => {
        console.log('Ami trouvé:', response);
      },
      (error) => {
        console.error("Erreur lors de la recherche de l'ami:", error);
      },
    );
  }
}
