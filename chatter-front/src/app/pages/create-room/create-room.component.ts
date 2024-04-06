import { Component } from '@angular/core';
import { FriendListComponent } from '../../components/blocs/friend-list/friend-list.component';

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [FriendListComponent],
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.scss',
})
export class CreateRoomComponent {}
