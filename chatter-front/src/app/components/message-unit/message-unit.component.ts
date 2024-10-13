import {
  AfterViewInit,
  Component,
  effect,
  input,
  InputSignal,
} from '@angular/core';
import { MessageModel } from '../../models/message.model';
import { DatePipe, NgClass } from '@angular/common';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { UserModel } from '../../models/user.model';
import { environment } from '../../../env';

@Component({
  selector: 'app-message-unit',
  standalone: true,
  imports: [DatePipe, NgClass, PickerModule],
  templateUrl: './message-unit.component.html',
  styleUrl: './message-unit.component.scss',
})
export class MessageUnitComponent implements AfterViewInit {
  protected apiUrl = environment.apiUrl;

  public getMe: InputSignal<UserModel> = input.required<UserModel>();

  public message: InputSignal<MessageModel | null> =
    input.required<MessageModel | null>();
  /*
     <div>
      <emoji-mart title="Pick your emoji…" emoji="point_up"></emoji-mart>
    </div>
    //TODO EMOJIS !
   */
  public constructor() {
    effect(
      () => {
        if (!this.message()) {
          return;
        }
        //console.log(this.message());
      },
      { allowSignalWrites: true },
    );
  }

  ngAfterViewInit(): void {
    //console.log(this.message());
  }
}
