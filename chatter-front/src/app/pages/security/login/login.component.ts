import {
  Component,
  EventEmitter,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService, LoginCredentials } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatIconModule,
    MatInput,
    MatIconButton,
    MatButton,
    MatLabel,
    MatError,
  ],

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @Output() loginClicked: EventEmitter<void> = new EventEmitter<void>();
  public hide = true;
  public errors: WritableSignal<string[]> = signal([]);
  public errorMessage: WritableSignal<string> = signal('');

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur',
    }),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    if (this.loginForm.valid && email != null && password != null) {
      const credentials: LoginCredentials = { email, password };
      this.authService.login(credentials).subscribe({
        next: (response) => {
          localStorage.setItem('authToken', response.access_token);
          console.log(response);
          localStorage.setItem('currentUser', JSON.stringify(response));

          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Erreur lors de la connexion', error);
          this.errorMessage.set(
            error.error.message ||
              'Une erreur est survenue lors de la connexion.',
          );
        },
      });
    } else {
      this.errorMessage.set('Tous les champs sont requis.');
    }
  }

  loginAsAdmin() {
    const credentials: LoginCredentials = {
      email: 'dessauw.hugo@gmail.com',
      password: 'Password.11',
    };
    this.authService.login(credentials).subscribe({
      next: (response) => {
        localStorage.setItem('authToken', response.access_token);
        console.log(response);
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Erreur lors de la connexion', error);
        this.errorMessage.set(
          error.error.message ||
            'Une erreur est survenue lors de la connexion.',
        );
      },
    });
  }

  goRegister() {
    this.loginClicked.emit();
  }
}
/* Changement de thème

import {ThemeService} from "../../services/theme.service";

constructor(
  public themeService: ThemeService
) {}

toggleTheme(): void {
  this.themeService.toggleTheme();
}
*/
