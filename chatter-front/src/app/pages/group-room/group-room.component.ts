import { Component, signal, WritableSignal } from '@angular/core';
import { DiscussionComponent } from '../../components/blocs/discussion/discussion.component';
import { MessageModel } from '../../models/message.model';
import { GroupRoomProfilComponent } from '../../components/blocs/group-room-profil/group-room-profil.component';
import { GetMeModel, UserModel } from '../../models/user.model';
import { UserGeneralRoleEnum } from '../../enum/user.general.role.enum';

@Component({
  selector: 'app-group-room',
  standalone: true,
  imports: [DiscussionComponent, GroupRoomProfilComponent],
  templateUrl: './group-room.component.html',
  styleUrl: './group-room.component.scss',
})
export class GroupRoomComponent {
  public messages: WritableSignal<MessageModel[]> = signal([]);
  public getMe: WritableSignal<GetMeModel | null> = signal(null);

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
  constructor() {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      this.getMe.update(() => JSON.parse(userJson));
      console.log(this.getMe());
    }
  }
}
