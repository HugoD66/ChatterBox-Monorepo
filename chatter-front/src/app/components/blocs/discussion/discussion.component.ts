import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  OnInit,
} from '@angular/core';
import { ChatComponent } from './chat/chat.component';
import { MessageInputComponent } from './message-input/message-input.component';
import { MessageModel } from '../../../models/message.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-discussion',
  standalone: true,
  imports: [ChatComponent, MessageInputComponent],
  templateUrl: './discussion.component.html',
  styleUrl: './discussion.component.scss',
})
export class DiscussionComponent implements OnInit {
  public messages: InputSignal<MessageModel[] | null> = input.required<
    MessageModel[] | null
  >();

  ngOnInit(): void {
    console.log(this.messages());
  }
}
