import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageValidationService } from '../../../../services/message-validation.service';
import { MatIcon } from '@angular/material/icon';
import { MessageService } from '../../../../services/message.service';
import { MessageModel } from '../../../../models/message.model';
import { UserModel } from '../../../../models/user.model';
import { RoomModel } from '../../../../models/room.model';

@Component({
  selector: 'app-message-input',
  changeDetection: ChangeDetectionStrategy.OnPush,

  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatIcon],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss',
})
export class MessageInputComponent {
  //TODO Private ?
  public messageSendForm = new FormGroup({
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(1000),
    ]),
  });
  public getMe: InputSignal<UserModel> = input.required<UserModel>();
  public room: InputSignal<RoomModel> = input.required<RoomModel>();
  public friendInDiscussion: InputSignal<UserModel[] | UserModel> =
    input.required<UserModel[] | UserModel>();

  constructor(
    private validatorMessage: MessageValidationService,
    private messageService: MessageService,
  ) {}

  onSubmit() {
    if (this.messageSendForm.valid) {
      if (
        !this.validatorMessage.validateMessage(
          this.messageSendForm.value.message!,
        ) ||
        this.messageSendForm.value.message === null ||
        this.messageSendForm.value.message === undefined
      ) {
        //TODO DO RETOUR ERREUR
        console.warn('Validation failed: HTML tags are not allowed.');
        return;
      }
      /* constent createdAt sender room isRead*/
      const message = new MessageModel(
        this.messageSendForm.value.message,
        new Date(),
        this.getMe(),
        this.room().id,
        false,
      );
      this.messageService.sendMessage(message);
      console.log('Message envoyé :', this.messageSendForm.value.message);
      this.messageSendForm.reset();

    }
  }


}
