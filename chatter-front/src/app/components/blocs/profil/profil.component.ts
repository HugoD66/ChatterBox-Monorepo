import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
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
  public isEmailEditing: WritableSignal<boolean> = signal(false);

  constructor(
    private userService: UserService,
    public userFormService: UserUpdateService,
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
  public onSubmitPseudo() {
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
          this.isPseudoEditing.set(!this.isPseudoEditing());
          this.userUpdated.emit();
        },
        error: (error) => console.error('Update error:', error),
      });
    }
  }

  public updateEmail(): void {
    this.isEmailEditing.set(!this.isEmailEditing());
  }
  public onSubmitEmail() {
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
          this.isEmailEditing.set(!this.isEmailEditing());
          this.userUpdated.emit();
        },
        error: (error) => console.error('Update error:', error),
      });
    }
  }

  protected onFileSelect(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    if (element.files) {
      const file = element.files[0];
      this.userService
        .uploadUserPicture(this.getMe()!.id, file)
        .subscribe(() => {
          this.userService.getPicture().subscribe((picture) => {
            const pictureUrl = `${this.apiUrl}/./${picture}`;
            this.getMeAvatar.update(() => `${pictureUrl}`);
          });
        });
    }
  }
}
