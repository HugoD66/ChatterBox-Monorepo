import { AfterViewInit, Component, input, InputSignal } from '@angular/core';
import { MessageModel } from '../../models/message.model';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-message-unit',
  standalone: true,
  imports: [DatePipe, NgClass],
  templateUrl: './message-unit.component.html',
  styleUrl: './message-unit.component.scss',
})
export class MessageUnitComponent implements AfterViewInit {
  public message: InputSignal<MessageModel | null> =
    input.required<MessageModel | null>();

  ngAfterViewInit(): void {
    console.log(this.message());
  }
}
