import {
  Component,
  EventEmitter,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgStyle } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { RegisterModel } from '../../../models/register.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgStyle,
    FormsModule,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @Output() registerClicked: EventEmitter<void> = new EventEmitter<void>();
  public hide = true;
  public errorMessage: WritableSignal<string> = signal('');

  constructor(private authService: AuthService) {}

  goLogin() {
    this.registerClicked.emit();
  }

  registerForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur',
    }),
    pseudo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onSubmit(): void {
    const email = this.registerForm.value.email;
    const pseudo = this.registerForm.value.pseudo;
    const password = this.registerForm.value.password;
    if (
      this.registerForm.valid &&
      email != null &&
      pseudo != null &&
      password != null
    ) {
      const user: RegisterModel = { email, pseudo, password };
      this.authService.register(user).subscribe({
        next: () => {
          console.log('Inscription réussie.');
          this.errorMessage.set('');
          this.goLogin();
        },
        error: (error) => {
          console.log(error);
          this.errorMessage.set(
            error || "Une erreur est survenue lors de l'inscription.",
          );
        },
      });
    } else {
      this.errorMessage.set('Tous les champs sont requis.');
    }
  }
}
