import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopUpComponent } from '../components/pop-up/pop-up.component';
import { FriendSocket } from '../socket/response-model/friend-socket';
import { UserSocket } from '../socket/response-model/user-socket';
import { GetMeModel } from '../models/user.model';
import { AuthService } from './auth.service';
import { FriendRequestSocket } from '../socket/response-model/friend-request-socket';
import { Subject } from 'rxjs';

export class Popup {
  constructor(
    public data:
      | SimpleMessage
      | FriendSocket
      | UserSocket
      | FriendRequestSocket,
    public dataType: PopupDataTypeEnum,
    public getMe?: GetMeModel,
  ) {}
}

export class SimpleMessage {
  constructor(
    public message: string,
    public color: string,
  ) {}
}

export enum PopupDataTypeEnum {
  SIMPLE_MESSAGE = 'SIMPLE_MESSAGE',
  USER_LOGIN = 'USER_LOGIN',
  FRIEND_ACCEPTED = 'FRIEND_ACCEPTED',
  FRIEND_INVITATION = 'FRIEND_INVITATION',
}

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  public getMe: WritableSignal<GetMeModel> = signal(
    {} as unknown as GetMeModel,
  );

  public durationInSeconds = 3;
  public longDurationInSeconds = 6;

  public friendListRefreshNeeded: Subject<void> = new Subject<void>();

  constructor(
    private _snackBar: MatSnackBar,
    private authService: AuthService,
  ) {
    effect(() => {
      this.authService.getMe().subscribe((getMe: GetMeModel) => {
        this.getMe.update(() => getMe);
      });
    });
  }

  openSnackBar(message: string, color: string) {
    this._snackBar.openFromComponent(PopUpComponent, {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      data: { message: message, color: color },
    });
  }

  openSimpleMessageSnackBar(simpleMessage: SimpleMessage) {
    const socketTransfer = new Popup(
      simpleMessage,
      PopupDataTypeEnum.SIMPLE_MESSAGE,
    );
    this._snackBar.openFromComponent(PopUpComponent, {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      data: socketTransfer,
    });
  }

  openLoginSnackBar(userSocket: UserSocket) {
    const socketTransfer = new Popup(
      userSocket,
      PopupDataTypeEnum.USER_LOGIN,
      this.getMe(),
    );

    this._snackBar.openFromComponent(PopUpComponent, {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      data: socketTransfer,
    });
  }

  openFriendAcceptedSnackBar(friendAcceptedSocket: FriendSocket) {
    const socketTransfer = new Popup(
      friendAcceptedSocket,
      PopupDataTypeEnum.FRIEND_ACCEPTED,
      this.getMe(),
    );

    if (
      this.getMe().id === friendAcceptedSocket.receiverId ||
      friendAcceptedSocket.senderId
    ) {
      console.log('--------------------------------');
      console.log(this.getMe().id);
      console.log(friendAcceptedSocket.receiverId);
      console.log(friendAcceptedSocket.senderId);
      console.log('--------------------------------');

      this.friendListRefreshNeeded.next();
    }

    this._snackBar.openFromComponent(PopUpComponent, {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      data: socketTransfer,
    });
  }

  openFriendRequestSnackBar(friendRequestSocket: FriendRequestSocket) {
    const socketTransfer = new Popup(
      friendRequestSocket,
      PopupDataTypeEnum.FRIEND_INVITATION,
      this.getMe(),
    );

    this._snackBar.openFromComponent(PopUpComponent, {
      duration: this.longDurationInSeconds * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      data: socketTransfer,
    });
  }
}
