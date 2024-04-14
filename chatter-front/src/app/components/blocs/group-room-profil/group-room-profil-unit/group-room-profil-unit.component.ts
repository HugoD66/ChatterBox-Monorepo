import { Component, input, InputSignal } from '@angular/core';
import { UserModel } from '../../../../models/user.model';

@Component({
  selector: 'app-group-room-profil-unit',
  standalone: true,
  imports: [],
  templateUrl: './group-room-profil-unit.component.html',
  styleUrl: './group-room-profil-unit.component.scss',
})
export class GroupRoomProfilUnitComponent {
  public friend: InputSignal<UserModel> = input.required<UserModel>();
}
