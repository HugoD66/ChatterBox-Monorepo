import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  InputSignal,
  OnInit,
  Output,
  signal,
  ViewEncapsulation,
  WritableSignal,
} from '@angular/core';
import { GetMeModel } from '../../../models/user.model';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { LoaderComponent } from '../../loader/loader.component';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { UserService } from '../../../services/user.service';
import { environment } from '../../../../env';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { switchMap } from 'rxjs';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserInputComponent } from './user-input/user-input.component';
import { PopupService } from '../../../services/popup.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-profil',
  standalone: true,
  imports: [
    MatDivider,
    LoaderComponent,
    DatePipe,
    MatIcon,
    FormsModule,
    ReactiveFormsModule,
    UserInfoComponent,
    UserInputComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss',
})
export class ProfilComponent implements OnInit {
  @Output() userUpdated = new EventEmitter<void>();

  public getMe: InputSignal<GetMeModel | null> =
    input.required<GetMeModel | null>();
  public getMeAvatar: WritableSignal<string> = signal('');
  protected apiUrl = environment.apiUrl;
  public isLoading: WritableSignal<boolean> = signal(true);
  public isPseudoEditing: WritableSignal<boolean> = signal(false);
  public isEmailEditing = signal(false);
  public isPasswordEditing: WritableSignal<boolean> = signal(false);

  constructor(
    private userService: UserService,
    public authService: AuthService,
    private popupService: PopupService,
  ) {}

  ngOnInit(): void {
    this.userService.getPicture().subscribe((picture) => {
      const pictureUrl = `${this.apiUrl}/./${picture}`;
      this.getMeAvatar.update(() => `${pictureUrl}`);
      this.isLoading.set(false);
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
          this.popupService.openSimpleMessageSnackBar({
            message: 'Photo changée',
            color: 'green',
          });
        });
    } else {
      this.popupService.openSimpleMessageSnackBar({
        message: 'Format invalide',
        color: 'red',
      });
    }
  }
}
