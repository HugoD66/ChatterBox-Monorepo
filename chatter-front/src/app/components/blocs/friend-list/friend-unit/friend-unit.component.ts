import { Component, input, InputSignal } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { DialogService } from '../../../../services/dialog.service';
import { UserModel } from '../../../../models/user.model';

@Component({
  selector: 'app-friend-unit',
  standalone: true,
  imports: [MatDivider, MatIcon],
  templateUrl: './friend-unit.component.html',
  styleUrl: './friend-unit.component.scss',
})
export class FriendUnitComponent {
  public friend: InputSignal<UserModel> = input.required<UserModel>();

  constructor(private dialogService: DialogService) {}

  public openDialog(user: UserModel): void {
    console.log(user);
    this.dialogService.openDialog(this.friend());
  }
}
