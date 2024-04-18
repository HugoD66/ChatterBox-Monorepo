import {
  Component,
  EventEmitter,
  input,
  InputSignal,
  OnInit,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { UserModel } from '../../../../models/user.model';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { UserService } from '../../../../services/user.service';
import { UserUpdateService } from '../../../../services/user.update.service';
import { ChangePasswordModel } from '../../../../models/change-password.model';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatButton, MatInput],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.scss',
})
export class UserInputComponent implements OnInit {
  public getMe: InputSignal<UserModel | null> =
    input.required<UserModel | null>();
  public key: InputSignal<string> = input.required<string>();
  public formControlKey: WritableSignal<FormGroup> = signal(
    null as unknown as FormGroup,
  );
  public formControlName: WritableSignal<string> = signal('');
  @Output() updateView: EventEmitter<void> = new EventEmitter<void>();
  @Output() userFormGroup = new EventEmitter<void>();
  @Output() userUpdated = new EventEmitter<void>();

  constructor(
    private userService: UserService,
    public userFormService: UserUpdateService,
    public authService: AuthService,
  ) {}

  ngOnInit() {
    switch (this.key()) {
      case 'Pseudo':
        this.formControlKey.set(this.userFormService.updateFormPseudo);
        this.formControlName.set('pseudo');
        break;
      case 'Email':
        this.formControlKey.set(this.userFormService.updateFormEmail);
        this.formControlName.set('email');
        break;
      case 'Password':
        this.formControlKey.set(this.userFormService.updateFormPassword);
        this.formControlName.set('password');
        break;
    }
  }
  public async onSubmit() {
    switch (this.key()) {
      case 'Pseudo':
        await this.onSubmitPseudo();
        break;
      case 'Email':
        await this.onSubmitEmail();
        break;
      case 'Password':
        await this.onSubmitPassword();
        break;
    }
  }

  async onSubmitPseudo() {
    if (
      this.userFormService.updateFormPseudo.valid &&
      this.userFormService.updateFormPseudo.value.pseudo != null
    ) {
      const updatedData = {
        pseudo: this.userFormService.updateFormPseudo.value.pseudo,
      };
      const newUser = { ...this.getMe(), ...updatedData };
      this.userService.updateUser(this.getMe()!.id, newUser).subscribe({
        next: () => {
          this.updateView.emit();
          this.userUpdated.emit();
        },
        error: (error) => console.error('Update error:', error),
      });
    }
  }

  async onSubmitEmail() {
    if (
      this.userFormService.updateFormEmail.valid &&
      this.userFormService.updateFormEmail.value.email != null
    ) {
      const updatedData = {
        email: this.userFormService.updateFormEmail.value.email,
      };
      const newUser = { ...this.getMe(), ...updatedData };
      this.userService.updateUser(this.getMe()!.id, newUser).subscribe({
        next: () => {
          this.updateView.emit();
        },
        error: (error) => console.error('Update error:', error),
      });
    }
  }

  async onSubmitPassword() {
    if (
      this.userFormService.updateFormPassword.valid &&
      this.userFormService.updateFormPassword.value.password != null
    ) {
      const password: ChangePasswordModel = {
        password: this.userFormService.updateFormPassword.value.password,
      };
      this.authService.changePassword(password).subscribe({
        next: () => {
          this.updateView.emit();
        },
        error: (error) => console.error('Update error:', error),
      });
    }
  }
}
