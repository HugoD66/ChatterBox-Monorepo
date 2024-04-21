import { Component, input, InputSignal } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { MatIcon } from '@angular/material/icon';
import { DialogService } from '../../../services/dialog.service';
import { LoaderComponent } from '../../loader/loader.component';

@Component({
  selector: 'app-friend-profil',
  standalone: true,
  imports: [MatIcon, LoaderComponent],
  templateUrl: './friend-profil.component.html',
  styleUrl: './friend-profil.component.scss',
})
export class FriendProfilComponent {
  public friend: InputSignal<UserModel> = input.required<UserModel>();
  constructor(public dialogService: DialogService) {}
  public openDialog(user: UserModel): void {
    this.dialogService.openDialog(this.friend());
  }
}
