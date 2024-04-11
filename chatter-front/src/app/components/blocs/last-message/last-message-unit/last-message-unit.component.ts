import { Component, effect, Input, input, InputSignal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TruncateLongPipe } from '../../../../pipe/TruncateLongPipe';
import { MessageUnreadModel } from '../last-message.component';
import { Router } from '@angular/router';
import { update } from 'jdenticon';

@Component({
  selector: 'app-last-message-unit',
  standalone: true,
  imports: [DatePipe, MatButton, MatIcon, TruncateLongPipe],
  templateUrl: './last-message-unit.component.html',
  styleUrl: './last-message-unit.component.scss',
})
export class LastMessageUnitComponent {
  public message: InputSignal<MessageUnreadModel> =
    input.required<MessageUnreadModel>();

  constructor(private router: Router) {}

  redirectToChat(chatId: number): void {
    this.router.navigate([`/room/private/${chatId}`]);
  }
}
