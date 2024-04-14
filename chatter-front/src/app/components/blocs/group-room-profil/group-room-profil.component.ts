import { Component, input, InputSignal } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { GroupRoomProfilUnitComponent } from './group-room-profil-unit/group-room-profil-unit.component';

@Component({
  selector: 'app-group-room-profil',
  standalone: true,
  imports: [GroupRoomProfilUnitComponent],
  templateUrl: './group-room-profil.component.html',
  styleUrl: './group-room-profil.component.scss',
})
export class GroupRoomProfilComponent {
  public friendList: InputSignal<UserModel[]> = input.required<UserModel[]>();
}
