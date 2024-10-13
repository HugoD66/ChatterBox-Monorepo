import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { MessageModel } from '../../../../models/message.model';
import { MessageUnitComponent } from '../../../message-unit/message-unit.component';
import { UserModel } from '../../../../models/user.model';

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
  imports: [MessageUnitComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  public getMe: InputSignal<UserModel> = input.required<UserModel>();
  public friendInDiscussion: InputSignal<UserModel[] | UserModel> =
    input.required<UserModel[] | UserModel>();
  public messages: InputSignal<MessageModel[] | null> = input.required<
    MessageModel[] | null
  >();

  public messageSender: WritableSignal<MessageUnit | null> = signal(null);

  /* public constructor() {
    effect(
      () => {
        if (!this.getMe() || !this.friendInDiscussion() || !this.messages()) {
          return;
        }
        this.messages()?.forEach((message) => {
          const messageUnit = new MessageUnit(
            message.id,
            message.isRead,
            message.createdAt,
            message.content,
            message.sender.pseudo,
            message.sender.picture,
          );
          this.messageSender.set(messageUnit);
        });
      },
      { allowSignalWrites: true },
    );
  }*/
}
