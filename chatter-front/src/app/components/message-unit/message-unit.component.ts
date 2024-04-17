import { AfterViewInit, Component, input, InputSignal } from '@angular/core';
import { MessageModel } from '../../models/message.model';
import { DatePipe, NgClass } from '@angular/common';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@Component({
  selector: 'app-message-unit',
  standalone: true,
  imports: [DatePipe, NgClass, PickerModule],
  templateUrl: './message-unit.component.html',
  styleUrl: './message-unit.component.scss',
})
export class MessageUnitComponent implements AfterViewInit {
  public message: InputSignal<MessageModel | null> =
    input.required<MessageModel | null>();
  /*
     <div>
      <emoji-mart title="Pick your emoji…" emoji="point_up"></emoji-mart>
    </div>
    //TODO EMOJIS !
   */
  ngAfterViewInit(): void {
    //console.log(this.message());
  }
}
