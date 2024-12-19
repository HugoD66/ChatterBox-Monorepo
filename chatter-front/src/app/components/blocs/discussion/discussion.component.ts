import {
  ChangeDetectionStrategy,
  Component, inject,
  input,
  InputSignal,
} from '@angular/core';
import { ChatComponent } from './chat/chat.component';
import { MessageInputComponent } from './message-input/message-input.component';
import { MessageModel } from '../../../models/message.model';
import { UserModel } from '../../../models/user.model';
import { RoomModel } from '../../../models/room.model';
import { WebSocketService } from '../../../socket/socket.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-discussion',
  standalone: true,
  imports: [ChatComponent, MessageInputComponent],
  templateUrl: './discussion.component.html',
  styleUrl: './discussion.component.scss',
})
export class DiscussionComponent {
  public getMe: InputSignal<UserModel> = input.required<UserModel>();
  public room: InputSignal<RoomModel> = input.required<RoomModel>();
  public friendInDiscussion: InputSignal<UserModel[] | UserModel> =
    input.required<UserModel[] | UserModel>();
  public messages: InputSignal<MessageModel[] | null> = input.required<
    MessageModel[] | null
  >();

  public scrollToBottom: InputSignal<boolean | undefined> = input<boolean| undefined>();

  public webSocketService = inject(WebSocketService);


}
