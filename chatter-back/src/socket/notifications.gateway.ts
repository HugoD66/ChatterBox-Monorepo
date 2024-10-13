import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserResponse } from './class-response/user.response';
import { FriendResponse } from './class-response/friend.response';
import { FriendRequestResponse } from './class-response/friend-request.response';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

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

  handleDisconnect(client: Socket) {
    console.log(`Client déconnecté : ${client.id}`);
  }
}
