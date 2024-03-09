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
  public tempUser = 'aze@aze.com';
  public tempPass = 'azeaze';
  hide = true;
  public pictureBackWeb: string =
    '../assets/pictures/background/back-login-web.jpg';

  constructor(private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    console.warn(this.loginForm.value);
    if (
      this.loginForm.value.email === this.tempUser &&
      this.loginForm.value.password === this.tempPass
    ) {
      console.log('Login success');
      this.router.navigate(['/home']);
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
