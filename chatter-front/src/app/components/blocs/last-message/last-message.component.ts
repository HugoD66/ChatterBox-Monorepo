import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { LoaderComponent } from '../../loader/loader.component';
import { FriendUnitComponent } from '../friend-list/friend-unit/friend-unit.component';
import { LastMessageUnitComponent } from './last-message-unit/last-message-unit.component';
import { MessageService } from '../../../services/message.service';
import { MessageModel } from '../../../models/message.model';

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
  imports: [
    MatButton,
    LoaderComponent,
    FriendUnitComponent,
    LastMessageUnitComponent,
  ],
  templateUrl: './last-message.component.html',
  styleUrl: './last-message.component.scss',
})
export class LastMessageComponent {
  public haveLastMessage: WritableSignal<boolean> = signal(true);
  public isLoading: WritableSignal<boolean> = signal(true);
  public unreadMessages: WritableSignal<MessageModel[] | null> = signal([]);

  constructor(public messageService: MessageService) {
    this.messageService.getUnreadMessages().subscribe((messages) => {
      this.unreadMessages.set(messages);

      if (messages.length === 0) {
        this.haveLastMessage.set(false);
      }

      this.isLoading.set(false);
    });
  }
}
