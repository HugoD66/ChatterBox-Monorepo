import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
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
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

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
  ],
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.scss',
})
export class CreateRoomComponent implements OnDestroy {
  hide = true;
  selectedFile: File | null = null;
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

  constructor() {}

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
