import { Component, input, InputSignal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TruncateLongPipe } from '../../../../pipe/TruncateLongPipe';
import { Router } from '@angular/router';
import { MessageModel } from '../../../../models/message.model';
import { environment } from '../../../../../env';

@Component({
  selector: 'app-last-message-unit',
  standalone: true,
  imports: [DatePipe, MatButton, MatIcon, TruncateLongPipe],
  templateUrl: './last-message-unit.component.html',
  styleUrl: './last-message-unit.component.scss',
})
export class LastMessageUnitComponent {
  public message: InputSignal<MessageModel> = input.required<MessageModel>();
  protected apiUrl = environment.apiUrl;

  constructor(private router: Router) {}

  redirectToRoom(chatId: string): void {
    this.router.navigate([`/room/private/${chatId}`]);
  }
}
