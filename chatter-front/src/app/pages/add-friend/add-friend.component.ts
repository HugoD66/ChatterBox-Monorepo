import { Component, signal, WritableSignal } from '@angular/core';
import { AddFriendProfilComponent } from '../../components/blocs/add-friend-profil/add-friend-profil.component';
import { AddFriendSearchComponent } from '../../components/blocs/add-friend-search/add-friend-search.component';
import { FriendProfilComponent } from '../../components/blocs/friend-profil/friend-profil.component';
import { UserModel } from '../../models/user.model';
import { UserGeneralRoleEnum } from '../../enum/user.general.role.enum';

@Component({
  selector: 'app-add-friend',
  standalone: true,
  imports: [
    AddFriendProfilComponent,
    AddFriendSearchComponent,
    FriendProfilComponent,
  ],
  templateUrl: './add-friend.component.html',
  styleUrl: './add-friend.component.scss',
})
export class AddFriendComponent {
  public friend: WritableSignal<UserModel> = signal({
    id: '1',
    pseudo: 'Alice',
    email: 'alice@example.com',
    picture: 'path/to/alice.jpg',
    createdAt: new Date('2024-01-01'),
    generalRoleEnum: UserGeneralRoleEnum.User,
  });
}
