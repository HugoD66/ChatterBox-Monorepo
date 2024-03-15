import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { NgStyle } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    NgStyle,
    LoginComponent,
    RegisterComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  public isLoginChildren: WritableSignal<boolean> = signal(true);
  public pictureBackWeb: string =
    '../assets/pictures/background/back-login-web.jpg';

  goRegister() {
    this.isLoginChildren()
      ? this.isLoginChildren.set(false)
      : this.isLoginChildren.set(true);
  }

  handleRegisterClick() {
    this.goRegister();
  }
}
