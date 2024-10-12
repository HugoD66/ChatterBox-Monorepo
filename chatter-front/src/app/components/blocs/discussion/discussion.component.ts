import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { ChatComponent } from './chat/chat.component';
import { MessageInputComponent } from './message-input/message-input.component';
import { MessageModel } from '../../../models/message.model';
import { UserModel } from '../../../models/user.model';

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

  public messages: InputSignal<MessageModel[] | null> = input.required<
    MessageModel[] | null
  >();
}
