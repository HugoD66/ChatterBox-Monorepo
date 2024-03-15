import { Component } from '@angular/core';
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
import { UserModel } from '../../../models/user.model';
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
  styleUrls: ['./register.component.scss'], // Assurez-vous que la propriété s'appelle styleUrls au lieu de styleUrl
})
export class RegisterComponent {
  hide = true;

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), // Vous pouvez ajouter des validateurs supplémentaires si nécessaire
    pseudo: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]), // Exemple: mot de passe avec une longueur minimale
  });

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

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
        next: (response: UserModel) => {
          console.log('Inscription réussie', response);
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          console.error("Erreur lors de l'inscription", error);
        },
      });
    } else {
      console.log(
        "Les champs 'email', 'pseudo' et 'password' doivent être remplis.",
      );
    }
  }
}
