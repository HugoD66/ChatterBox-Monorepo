import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  inject,
  input,
  InputSignal,
  OnInit,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';

import { UserModel } from '../../../models/user.model';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { LoaderComponent } from '../../loader/loader.component';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { UserService } from '../../../services/user.service';
import { environment } from '../../../../env';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { UserUpdateService } from '../../../services/user.update.service';
import { AuthService } from '../../../services/auth.service';
import { ChangePasswordModel } from '../../../models/change-password.model';
import { switchMap } from 'rxjs';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserInputComponent } from './user-input/user-input.component';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-profil',
  standalone: true,
  imports: [
    MatButton,
    MatDivider,
    LoaderComponent,
    DatePipe,
    MatIcon,
    NgOptimizedImage,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    UserInfoComponent,
    UserInputComponent,
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss',
})
export class ProfilComponent implements OnInit {
  @Output() userUpdated = new EventEmitter<void>();

  public getMe: InputSignal<UserModel | null> =
    input.required<UserModel | null>();
  public getMeAvatar: WritableSignal<string> = signal('');
  protected apiUrl = environment.apiUrl;
  public isLoading: WritableSignal<boolean> = signal(true);
  public isPseudoEditing: WritableSignal<boolean> = signal(false);
  public isEmailEditing = signal(false);
  public isPasswordEditing: WritableSignal<boolean> = signal(false);

  constructor(
    private userService: UserService,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.userService.getPicture().subscribe((picture) => {
      const pictureUrl = `${this.apiUrl}/./${picture}`;
      this.getMeAvatar.update(() => `${pictureUrl}`);
      this.isLoading.update(() => false);
    });
  }

  public updatePseudo(): void {
    this.isPseudoEditing.set(!this.isPseudoEditing());
  }
  public updateEmail(): void {
    this.isEmailEditing.set(!this.isEmailEditing());
  }
  public updatePassword(): void {
    this.isPasswordEditing.set(!this.isPasswordEditing());
  }

  protected onFileSelect(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    if (element.files) {
      const file = element.files[0];
      this.userService
        .uploadUserPicture(this.getMe()!.id, file)
        .pipe(switchMap(() => this.userService.getPicture()))
        .subscribe((picture) => {
          const pictureUrl = `${this.apiUrl}/./${picture}`;
          this.getMeAvatar.update(() => `${pictureUrl}`);
          this.userUpdated.emit();
        });
    }
  }
}
