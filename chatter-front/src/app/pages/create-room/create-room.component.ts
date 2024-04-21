import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { FriendListComponent } from '../../components/blocs/friend-list/friend-list.component';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';
import { LoaderComponent } from '../../components/loader/loader.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-create-room',
  standalone: true,
  imports: [
    FriendListComponent,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatIcon,
    MatIconButton,
    MatIconModule,
    MatSuffix,
    LoaderComponent,
  ],
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.scss',
})
export class CreateRoomComponent implements OnDestroy {
  public isLoading: WritableSignal<boolean> = signal(false);
  hide = true;
  selectedFile: File | null = null;

  public callGetMe: Observable<UserModel> = this.authService.getMe();
  public getMe: Signal<UserModel> = toSignal(this.callGetMe, {
    initialValue: {} as unknown as UserModel,
  });

  public isSelectedFile: WritableSignal<boolean> = signal(false);
  createRoomForm: FormGroup = new FormGroup({
    nameRoom: new FormControl('', [
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(3),
    ]),

    passwordRoom: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(private authService: AuthService) {
    this.callGetMe.subscribe(() => {
      console.log(this.getMe());
      this.isLoading.set(false);
    });
  }

  onNameChange(): void {
    console.log('Name changed');
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.selectedFile = null;
    } else {
      this.selectedFile = input.files[0];
    }
    console.log(this.selectedFile);
    this.isSelectedFile.set(true);
  }

  onSubmit() {
    console.log(this.createRoomForm.value);
    if (this.createRoomForm.valid) {
      console.log('Form submitted');
    }
  }
  ngOnDestroy(): void {
    this.isSelectedFile.set(false);
  }

  onPasswordChange() {}
}
