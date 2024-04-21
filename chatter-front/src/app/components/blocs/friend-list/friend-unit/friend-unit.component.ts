import { Component, effect, input, InputSignal } from '@angular/core';
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
  public friend: InputSignal<UserModel | null> =
    input.required<UserModel | null>();

  constructor(private dialogService: DialogService) {
    effect(() => {
      //console.log(this.friend());
    });
  }

  public openDialog(user: UserModel): void {
    console.log(user);
    //this.dialogService.openDialog(this.friend());
  }
}
