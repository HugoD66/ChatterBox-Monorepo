import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { MessageModel } from '../../../../models/message.model';
import { MessageUnitComponent } from '../../../message-unit/message-unit.component';
import { UserModel } from '../../../../models/user.model';

@Component({
  selector: 'app-chat',
  changeDetection: ChangeDetectionStrategy.OnPush,

  standalone: true,
  imports: [MessageUnitComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  public getMe: InputSignal<UserModel> = input.required<UserModel>();

  public messages: InputSignal<MessageModel[] | null> = input.required<
    MessageModel[] | null
  >();
}
