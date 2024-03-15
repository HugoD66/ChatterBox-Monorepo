import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
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
  ],

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  hide = true;
  public pictureBackWeb: string =
    '../assets/pictures/background/back-login-web.jpg';

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    if (this.loginForm.valid && email != null && password != null) {
      const credentials: LoginCredentials = { email, password };
      console.log(credentials);
      this.authService.login(credentials).subscribe({
        next: (response) => {
          localStorage.setItem('authToken', response.access_token);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Erreur lors de la connexion', error);
        },
      });
    } else {
      console.log("Les champs 'email' et 'password' doivent être remplis.");
    }
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
