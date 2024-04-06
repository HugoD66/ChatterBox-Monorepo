import { Component } from '@angular/core';
import { ChatComponent } from './chat/chat.component';
import { MessageInputComponent } from './message-input/message-input.component';

@Component({
  selector: 'app-discussion',
  standalone: true,
  imports: [ChatComponent, MessageInputComponent],
  templateUrl: './discussion.component.html',
  styleUrl: './discussion.component.scss',
})
export class DiscussionComponent {}
