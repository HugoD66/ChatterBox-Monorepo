import {
  Component,
  Inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { NgStyle } from '@angular/common';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import {
  Popup,
  PopupDataTypeEnum,
  SimpleMessage,
} from '../../services/popup.service';
import { UserService } from '../../services/user.service';
import { UserSocket } from '../../socket/response-model/user-socket';
import { environment } from '../../../env';
import { FriendSocket } from '../../socket/response-model/friend-socket';
import { FriendRequestSocket } from '../../socket/response-model/friend-request-socket';

class UserLoggerPopup {
  constructor(
    public pseudo: string,
    public picture: string,
  ) {}
}
@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [NgStyle, MatSnackBarLabel, MatSnackBarActions, MatIcon],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss',
})
export class PopUpComponent implements OnInit {
  public isLoading: WritableSignal<boolean> = signal(true);
  public apiUrl = environment.apiUrl;
  public urlDev = environment.urlDev;
  public userLogged: UserLoggerPopup = new UserLoggerPopup('', '');

  public message?: string;
  public color?: string;
  public picture?: string;
  public pathRedirect?: string;

  public constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: Popup,
    public snackBarRef: MatSnackBarRef<PopUpComponent>,
    private readonly userService: UserService,
  ) {}

  async ngOnInit() {
    if (!this.data) {
      return;
    }
    let data;
    switch (this.data.dataType) {
      case PopupDataTypeEnum.SIMPLE_MESSAGE:
        data = this.data.data as SimpleMessage;
        this.message = data.message;
        this.color = data.color;
        this.isLoading.set(false);

        break;
      case PopupDataTypeEnum.USER_LOGIN:
        data = this.data.data as UserSocket;

        if (this.data.getMe!.id === data.id) {
          this.message = 'Bienvenu sur ChatterBox !';
          this.isLoading.set(false);
          return;
        }

        (await this.userService.getUserById(data.id)).subscribe((user) => {
          this.userLogged.pseudo = user.pseudo;
          if (user.picture != null) {
            this.userLogged.picture = user.picture;
          }
        });

        this.isLoading.set(false);
        break;
      case PopupDataTypeEnum.FRIEND_ACCEPTED:
        data = this.data.data as FriendSocket;
        this.message = `${data.friendPseudo} et ${data.userPseudo} sont désormais amis !`;

        this.isLoading.set(false);
        break;
      case PopupDataTypeEnum.FRIEND_INVITATION:
        data = this.data.data as FriendRequestSocket;

        if (this.data.getMe!.id === data.receiverId) {
          this.picture = data.senderPicture;
          this.message = `${data.senderPseudo} vous a envoyé une invitation d'amitié !`;
          this.pathRedirect = `${this.urlDev}/friend/add/${data.senderId}`;

          this.isLoading.set(false);
        }
        break;
    }
  }

  public redirectToUserPage(pathRedict?: string) {
    if (!pathRedict) {
      return;
    }
    window.window.open(pathRedict, '_blank');
  }
}
