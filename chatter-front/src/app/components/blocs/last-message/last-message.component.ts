import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { LoaderComponent } from '../../loader/loader.component';
import { FriendUnitComponent } from '../friend-list/friend-unit/friend-unit.component';
import { LastMessageUnitComponent } from './last-message-unit/last-message-unit.component';
import { MessageService } from '../../../services/message.service';
import { MessageModel } from '../../../models/message.model';
import { UserModel } from '../../../models/user.model';
import { RoomService } from '../../../services/room.service';

export interface MessageUnreadModel {
  id: number;
  senderName: string;
  body: string;
  sentDate: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-last-message',
  standalone: true,
  imports: [MatButton, LoaderComponent, LastMessageUnitComponent],
  templateUrl: './last-message.component.html',
  styleUrl: './last-message.component.scss',
})
export class LastMessageComponent {
  public getMe: InputSignal<UserModel> = input.required<UserModel>();
  public haveLastMessage: WritableSignal<boolean> = signal(true);
  public isLoading: WritableSignal<boolean> = signal(true);
  public unreadMessages: WritableSignal<MessageModel[] | null> = signal([]);

  constructor(public roomService: RoomService) {
    effect(() => {
      if (this.getMe().id) {
        this.roomService
          .getUnreadsMessagesByUser(this.getMe().id)
          .subscribe((messages: MessageModel[]) => {
            this.unreadMessages.update(() => messages);
            console.log('unreadMessages', messages);
            if (messages.length === 0) {
              this.haveLastMessage.set(false);
            }
            this.isLoading.set(false);
          });
        /*this.messageService
          .getUnreadMessages(this.getMe().id)
          .subscribe((messages) => {
            this.unreadMessages.update(() => messages);
            if (messages.length === 0) {
              this.haveLastMessage.set(false);
            }
            this.isLoading.set(false);
          });*/
      }
    });
  }
}
/*

*/
