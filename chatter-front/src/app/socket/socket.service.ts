import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { interval, Observable, Subscription } from 'rxjs';
import { environment } from '../../env';
import { PopupService } from '../services/popup.service';
import { UserSocket } from './response-model/user-socket';
import { FriendSocket } from './response-model/friend-socket';
import { FriendRequestSocket } from './response-model/friend-request-socket';
import { MessageModel } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  public socket: Socket | undefined;
  protected apiUrl = environment.apiUrl;
  private reconnectSubscription: Subscription | undefined;

  constructor(private popupService: PopupService) {}

  connect() {
    this.initializeSocket();

    this.socket?.on('connect', () => {
      console.log('Connecté au serveur WebSocket');
      this.clearReconnectInterval();
    });

    this.socket?.on('disconnect', (reason) => {
      console.log('Déconnecté du serveur WebSocket :', reason);
      this.handleReconnect();
    });

    this.socket?.on('connect_error', (error) => {
      console.log('Erreur de connexion WebSocket :', error);
      this.handleReconnect();
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
        const friendAcceptedSocket = acceptedFriendInvitation as FriendSocket;
        this.popupService.openFriendAcceptedSnackBar(friendAcceptedSocket);
      }
    );

    this.listen('newMessageChat').subscribe((data: unknown) => {
      const message = data as MessageModel;
      console.log('newMessageChat', message);
    });
  }

  private initializeSocket() {
    this.socket = io(this.apiUrl, {
      reconnection: false,
    });

    interval(10000).subscribe(() => {
      if (this.socket?.connected) {
        this.emit('heartbeat', 'WebSocket connected');
      }
    });
  }

  private handleReconnect() {
    if (!this.reconnectSubscription) {
      console.log('Tentative de reconnexion dans 10 secondes...');
      this.reconnectSubscription = interval(10000).subscribe(() => {
        console.log('Nouvelle tentative de connexion...');
        this.initializeSocket();
      });
    }
  }

  private clearReconnectInterval() {
    if (this.reconnectSubscription) {
      this.reconnectSubscription.unsubscribe();
      this.reconnectSubscription = undefined;
    }
  }

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
