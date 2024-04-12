import { Component, input, InputSignal } from '@angular/core';
import { MessageModel } from '../../../../models/message.model';
import { MessageUnitComponent } from '../../../message-unit/message-unit.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MessageUnitComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  public messages: InputSignal<MessageModel[] | null> = input.required<
    MessageModel[] | null
  >();
}
