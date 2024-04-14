import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageValidationService } from '../../../../services/message-validation.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-message-input',
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

  constructor(private validatorMessage: MessageValidationService) {}

  onSubmit() {
    if (this.messageSendForm.valid) {
      if (
        !this.validatorMessage.validateMessage(
          this.messageSendForm.value.message!,
        )
      ) {
        console.warn('Validation failed: HTML tags are not allowed.');
        return;
      }
      console.log('Message envoyé :', this.messageSendForm.value.message);
    }
  }
}
