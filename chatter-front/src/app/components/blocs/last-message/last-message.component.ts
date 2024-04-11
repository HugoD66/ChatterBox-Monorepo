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
  public messagesUnread: WritableSignal<MessageUnreadModel[] | null> = signal(
    [],
  );
  public messageUnreadList: MessageUnreadModel[] = [
    {
      id: 1,
      senderName: 'John Doe',
      body: 'Hello, how are you? I am fine, thank you! And you? How are you doing?  ank you! And you? How are you doing?  I am fine, thank you! And you? How are y ank you! And you? How are you doing?  I am fine, thank you! And you? How are y ank you! And you? How are you doing?  I am fine, thank you! And you? How are yI am fine, thank you! And you? How are you doing? ',
      sentDate: '2021-01-01 12:00:00',
    },
    {
      id: 2,
      senderName: 'Jane Doe',
      body: 'I am fine, thank you! And you? How are you doing? ',
      sentDate: '2021-01-01 12:01:00',
    },
  ];

  constructor() {
    this.messagesUnread.set(this.messageUnreadList);
    this.isLoading.set(false);
  }
}
