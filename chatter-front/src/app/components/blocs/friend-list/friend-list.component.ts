import { Component, signal, WritableSignal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { LoaderComponent } from '../../loader/loader.component';
import { FriendUnitComponent } from './friend-unit/friend-unit.component';
import { UserGeneralRoleEnum } from '../../../enum/user.general.role.enum';
import { UserModel } from '../../../models/user.model';

@Component({
  selector: 'app-friend-list',
  standalone: true,
  imports: [
    MatButton,
    AsyncPipe,
    MatProgressSpinner,
    LoaderComponent,
    FriendUnitComponent,
  ],
  templateUrl: './friend-list.component.html',
  styleUrl: './friend-list.component.scss',
})
export class FriendListComponent {
  public haveFriends: WritableSignal<boolean> = signal(true);
  public isLoading: WritableSignal<boolean> = signal(false);
  public friendList: WritableSignal<UserModel[]> = signal([
    {
      id: '1',
      pseudo: 'Alice',
      email: 'alice@example.com',
      picture: 'path/to/alice.jpg',
      createdAt: new Date('2024-01-01'),
      generalRoleEnum: UserGeneralRoleEnum.User,
    },
    {
      id: '2',
      pseudo: 'Bob',
      email: 'bob@example.com',
      picture: 'path/to/bob.jpg',
      createdAt: new Date('2024-01-02'),
      generalRoleEnum: UserGeneralRoleEnum.Admin,
    },
    {
      id: '3',
      pseudo: 'Charlie',
      email: 'charlie@example.com',
      picture: 'path/to/charlie.jpg',
      createdAt: new Date('2024-01-03'),
      generalRoleEnum: UserGeneralRoleEnum.User,
    },
  ]);
  //public friendList: WritableSignal<UserModel[]> = signal([]);
}
