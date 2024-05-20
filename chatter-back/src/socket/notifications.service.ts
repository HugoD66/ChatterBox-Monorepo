import { Injectable } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
  constructor(private readonly notificationsGateway: NotificationsGateway) {}

  sendInvitationNotification(invitationDetails: string): void {
    this.notificationsGateway.server.emit(
      'receiveNotification',
      invitationDetails,
    );
  }
}
