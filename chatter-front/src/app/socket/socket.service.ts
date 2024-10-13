import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../env';
import { UserSocket } from './response-model/user-socket';
import { FriendSocket } from './response-model/friend-socket';
import { PopupService } from '../services/popup.service';
import { FriendRequestSocket } from './response-model/friend-request-socket';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  public socket: Socket | undefined;
  protected apiUrl = environment.apiUrl;

  constructor(private popupService: PopupService) {}
  connect() {
    this.socket = io(this.apiUrl);
    this.socket.on('connect', () => {
      console.log('Connecté au serveur WebSocket');
    });
    this.socket.on('disconnect', (reason) => {
      console.log('Déconnecté du serveur WebSocket :', reason);
    });

    this.listen('userConnected').subscribe((user: unknown) => {
      const userSocket = user as UserSocket;
      console.log('userConnected', userSocket);
      this.popupService.openLoginSnackBar(userSocket);
    });

    this.listen('userFriendInvitation').subscribe((friendRelation: unknown) => {
      const friendInvitationSocket = friendRelation as FriendRequestSocket;
      this.popupService.openFriendRequestSnackBar(friendInvitationSocket);
    });

    this.listen('emitAcceptedFriendInvitation').subscribe(
      (acceptedFriendInvitation: unknown) => {
        console.log('response emitAcceptedFriendInvitation');
        const friendAcceptedSocket = acceptedFriendInvitation as FriendSocket;
        this.popupService.openFriendAcceptedSnackBar(friendAcceptedSocket);
      },
    );
  }

  /*disconnect(): void {
   if (this.socket) {
     this.socket.disconnect();
   }
 }*/

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket?.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket?.emit(eventName, data);
  }
}
