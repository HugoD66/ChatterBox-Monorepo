import { Component, Inject, signal, WritableSignal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogComponent {
  public friend: WritableSignal<UserModel | null> = signal(null);
  constructor(@Inject(MAT_DIALOG_DATA) public user: UserModel) {}
}
