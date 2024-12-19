import {
  ChangeDetectionStrategy,
  Component, effect, ElementRef,
  input,
  InputSignal,
  signal, ViewChild,
  WritableSignal,
} from '@angular/core';
import { MessageModel } from '../../../../models/message.model';
import { MessageUnitComponent } from '../../../message-unit/message-unit.component';
import { UserModel } from '../../../../models/user.model';
import { MatIcon } from '@angular/material/icon';

export class MessageUnit {
  constructor(
    public id: string,
    public isRead: boolean,
    public createdAt: Date,
    public content: string,
    public pseudo: string,
    public picture?: string,
  ) {}
}

@Component({
  selector: 'app-chat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MessageUnitComponent, MatIcon],
  templateUrl: './chat.component.html',
  host: { '(window:resize)': 'scrollToBottomEvent()' },
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  public getMe: InputSignal<UserModel> = input.required<UserModel>();
  public friendInDiscussion: InputSignal<UserModel[] | UserModel> =
    input.required<UserModel[] | UserModel>();
  public messages: InputSignal<MessageModel[] | null> = input.required<
    MessageModel[] | null
  >();
  //TODO REMOVE | undefined after set it on room.component
  public scrollToBottom: InputSignal<boolean | undefined> = input<boolean | undefined>();

  public messageSender: WritableSignal<MessageUnit | null> = signal(null);

  @ViewChild('chatContainer') chatContainer!: ElementRef<HTMLDivElement>;

  public constructor() {
    console.log('ttttttttt')
    console.log(this.scrollToBottom())
    effect(() => {
      if (this.scrollToBottom()) {
        console.log('TEST')

        this.scrollToBottomEvent()
      }
    }, { allowSignalWrites: true });
  }

  public scrollToBottomEvent(): void {
    this.chatContainer.nativeElement.scrollTop =
    this.chatContainer.nativeElement.scrollHeight;
  }


}
