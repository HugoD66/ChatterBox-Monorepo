import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  InputSignal,
  OnInit,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { GetMeModel } from '../../../models/user.model';
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
  /*animations: [
    trigger('blurAnimation', [
      transition(':enter', [
        style({
          width: '100%', // Assurez-vous que le largeur est correcte
          top: 0, // Alignez le haut
          filter: 'blur(10px)',
          zIndex: 2, // Plus haut z-index pour s'assurer qu'il est au-dessus
        }),
        animate('0.5s ease-out', style({ filter: 'blur(0)' })),
      ]),
      transition(':leave', [
        style({
          width: '100%',
          top: 0,
          zIndex: 1, // Inférieur z-index pour que cela reste en dessous
        }),
        animate('0.5s ease-in', style({ filter: 'blur(10px)' })),
      ]),
    ]),
  ],*/
  /*
  animations: [
  trigger('blurAnimation', [
    transition(':enter', [
      style({ opacity: 0, filter: 'blur(10px)' }),
      animate('0.5s ease-out', style({ opacity: 1, filter: 'blur(0)' })),
    ]),
    transition(':leave', [
      animate('0.5s ease-in', style({ opacity: 0, filter: 'blur(10px)' })),
    ]),
  ]),
]
   */
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
