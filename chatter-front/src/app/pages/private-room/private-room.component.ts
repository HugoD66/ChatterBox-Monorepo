import { Component, signal, WritableSignal } from '@angular/core';
import { FriendProfilComponent } from '../../components/blocs/friend-profil/friend-profil.component';
import { DiscussionComponent } from '../../components/blocs/discussion/discussion.component';
import { UserModel } from '../../models/user.model';
import { UserGeneralRoleEnum } from '../../enum/user.general.role.enum';
import { MessageModel } from '../../models/message.model';

@Component({
  selector: 'app-private-room',
  standalone: true,
  imports: [FriendProfilComponent, DiscussionComponent],
  templateUrl: './private-room.component.html',
  styleUrl: './private-room.component.scss',
})
export class PrivateRoomComponent {
  public friend: WritableSignal<UserModel> = signal({
    id: '1',
    pseudo: 'Alice',
    email: 'alice@example.com',
    picture: 'path/to/alice.jpg',
    createdAt: new Date('2024-01-01'),
    generalRoleEnum: UserGeneralRoleEnum.User,
  });
  public messages: WritableSignal<MessageModel[]> = signal([]);
}
