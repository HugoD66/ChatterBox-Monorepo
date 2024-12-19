import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserResponse } from './class-response/user.response';
import { FriendResponse } from './class-response/friend.response';
import { FriendRequestResponse } from './class-response/friend-request.response';
import { Logger } from '@nestjs/common';
import { Message } from '../message/entities/message.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationsGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(NotificationsGateway.name);

  afterInit() {
    setInterval(() => {
      try {
        const clientsCount = this.server.sockets.sockets.size;

        if (clientsCount > 0) {
          this.logger.log(
            `Envoi de la vérification de connexion à ${clientsCount} clients`,
          );
          this.server.emit('heartbeat', 'Serveur WebSocket actif');
        } else {
          this.logger.warn('Aucun client connecté, pas de message envoyé.');
        }
      } catch (error) {
        this.logger.error(
          `Erreur lors de l'envoi de la vérification de connexion: ${error.message}`,
        );
      }
    }, 10000);
  }

  @SubscribeMessage('heartbeat')
  handleHeartbeat(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log(`Message de connexion reçu de ${client.id}: ${message}`);
    client.emit('heartbeatResponse', 'Serveur WebSocket toujours actif');
  }

  @SubscribeMessage('sendNotification')
  handleSendNotification(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log(`Message reçu de ${client.id}: ${message}`);
    this.server.emit('receiveNotification', message);
  }

  @SubscribeMessage('userConnected')
  emitUserConnected(message: string, user: UserResponse): void {
    console.log(`Message Socket : ${message}`);
    this.server.emit('userConnected', user);
  }

  @SubscribeMessage('userFriendInvitation')
  emitFriendInvitation(message: string, user: FriendRequestResponse): void {
    console.log(`Message Socket : ${message}`);
    this.server.emit('userFriendInvitation', user);
  }

  @SubscribeMessage('emitAcceptedFriendInvitation')
  emitAcceptedFriendInvitation(message: string, user: FriendResponse): void {
    console.log(`Message Socket : ${message}`);
    this.server.emit('emitAcceptedFriendInvitation', user);
  }

  @SubscribeMessage('newMessageChat')
  emitRefreshDiscussion(message: string, newMessage: Message): void {
    console.log(`New Message Socket : ${message}`);
    this.server.emit('newMessageChat', newMessage);
  }

  //TODO
  /*@SubscribeMessage('newMessageChat')
  emitNewMessage(message: string, receiver: FriendResponse, sender: FriendResponse): void {
    console.log(`New Message Socket : ${message}`);
    this.server.emit('newMessageChat', receiver);
  }*/

  handleDisconnect(client: Socket) {
    console.log(`Client déconnecté : ${client.id}`);
  }
}
