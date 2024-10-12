import { Component, effect, signal, WritableSignal } from '@angular/core';
import { DiscussionComponent } from '../../components/blocs/discussion/discussion.component';
import { MessageModel } from '../../models/message.model';
import { GroupRoomProfilComponent } from '../../components/blocs/group-room-profil/group-room-profil.component';
import { GetMeModel, UserModel } from '../../models/user.model';
import { UserGeneralRoleEnum } from '../../enum/user.general.role.enum';
import { AuthService } from '../../services/auth.service';
import { FriendProfilComponent } from '../../components/blocs/friend-profil/friend-profil.component';
import { AddFriendSearchComponent } from '../../components/blocs/add-friend-search/add-friend-search.component';
import {
  openCloseFriendPrivateRoomAnimation,
  openCloseFriendProfilAnimation,
  openCloseFriendSearchAnimation,
} from '../../services/animation/animation';

@Component({
  selector: 'app-group-room',
  standalone: true,
  imports: [
    DiscussionComponent,
    GroupRoomProfilComponent,
    FriendProfilComponent,
    AddFriendSearchComponent,
  ],
  templateUrl: './group-room.component.html',
  styleUrl: './group-room.component.scss',
  animations: [
    openCloseFriendProfilAnimation,
    openCloseFriendSearchAnimation,
    openCloseFriendPrivateRoomAnimation,
  ],
})
export class GroupRoomComponent {
  public messages: WritableSignal<MessageModel[]> = signal([]);
  public getMe: WritableSignal<GetMeModel | null> = signal(null);

  public isExpandedFriendProfil = false;
  public isExpandedDiscussion = true;

  public friendList: WritableSignal<UserModel[]> = signal([
    {
      id: '1',
      pseudo: 'John Doe',
      email: 'TestTempalte@email.com',
      createdAt: new Date('2024-01-01T00:00:00'),
      roleGeneral: UserGeneralRoleEnum.User,
    },
    {
      id: '2',
      pseudo: 'Jane Doe',
      email: 'TestTempalte@email.com',
      createdAt: new Date('2024-01-01T00:00:00'),
      roleGeneral: UserGeneralRoleEnum.User,
    },
    {
      id: '3',
      pseudo: 'John Smith',
      email: 'TestTempalte@email.com',
      createdAt: new Date('2024-01-01T00:00:00'),
      roleGeneral: UserGeneralRoleEnum.User,
    },
    {
      id: '4',
      pseudo: 'Jane Smith',
      email: 'TestTempalte@email.com',
      createdAt: new Date('2024-01-01T00:00:00'),
      roleGeneral: UserGeneralRoleEnum.User,
    },
    {
      id: '5',
      pseudo: 'John Johnson',
      email: 'TestTempalte@email.com',
      createdAt: new Date('2024-01-01T00:00:00'),
      roleGeneral: UserGeneralRoleEnum.User,
    },
    {
      id: '6',
      pseudo: 'Jane Johnson',
      email: 'TestTempalte@email.com',
      createdAt: new Date('2024-01-01T00:00:00'),
      roleGeneral: UserGeneralRoleEnum.User,
    },
    {
      id: '7',
      pseudo: 'John Doe',
      email: 'TestTempalte@email.com',
      createdAt: new Date('2024-01-01T00:00:00'),
      roleGeneral: UserGeneralRoleEnum.User,
    },
    {
      id: '8',
      pseudo: 'John Doe',
      email: 'TestTempalte@email.com',
      createdAt: new Date('2024-01-01T00:00:00'),
      roleGeneral: UserGeneralRoleEnum.User,
    },
    {
      id: '9',
      pseudo: 'John Doe',
      email: 'TestTempalte@email.com',
      createdAt: new Date('2024-01-01T00:00:00'),
      roleGeneral: UserGeneralRoleEnum.User,
    },
    {
      id: '10',
      pseudo: 'John Doe',
      email: 'TestTempalte@email.com',
      createdAt: new Date('2024-01-01T00:00:00'),
      roleGeneral: UserGeneralRoleEnum.User,
    },
    {
      id: '11',
      pseudo: 'John Doe',
      email: 'TestTempalte@email.com',
      createdAt: new Date('2024-01-01T00:00:00'),
      roleGeneral: UserGeneralRoleEnum.User,
    },
    {
      id: '12',
      pseudo: 'John Doe',
      email: 'TestTempalte@email.com',
      createdAt: new Date('2024-01-01T00:00:00'),
      roleGeneral: UserGeneralRoleEnum.User,
    },
    {
      id: '13',
      pseudo: 'John Doe',
      email: 'TestTempalte@email.com',
      createdAt: new Date('2024-01-01T00:00:00'),
      roleGeneral: UserGeneralRoleEnum.User,
    },
    {
      id: '14',
      pseudo: 'John Doe',
      email: 'TestTempalte@email.com',
      createdAt: new Date('2024-01-01T00:00:00'),
      roleGeneral: UserGeneralRoleEnum.User,
    },
  ]);
  constructor(private authService: AuthService) {
    effect(() => {
      this.authService.getMe().subscribe((getMe: GetMeModel) => {
        this.getMe.update(() => getMe);
      });
      this.isExpandedFriendProfil = true;
      this.isExpandedDiscussion = false;
    });
  }
}
