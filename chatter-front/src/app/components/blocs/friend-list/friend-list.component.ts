import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { LoaderComponent } from '../../loader/loader.component';
import { FriendUnitComponent } from './friend-unit/friend-unit.component';
import { UserModel } from '../../../models/user.model';
import { FriendService } from '../../../services/friend.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  public isLoading: WritableSignal<boolean> = signal(true);
  public friendList: WritableSignal<UserModel[]> = signal([]);
  public getMe: InputSignal<UserModel | null> =
    input.required<UserModel | null>();

  constructor(private friendService: FriendService) {
    if (!this.getMe()!.friends.length) {
      this.haveFriends.set(false);
    }
  }

  /*

    ngOnInit() {
    if (this.getMe() === null) {
      return;
    }
    console.warn(this.getMe()!.friends);
    this.friendList.set(this.getMe()!.friends!);
  }

  public friendList: WritableSignal<UserModel[]> = signal([
    {
      id: '1',
      pseudo: 'Alice',
      email: 'alice@example.com',
      picture: 'path/to/alice.jpg',
      createdAt: new Date('2024-01-01'),
      roleGeneral: UserGeneralRoleEnum.User,
    },
    {
      id: '2',
      pseudo: 'Bob',
      email: 'bob@example.com',
      picture: 'path/to/bob.jpg',
      createdAt: new Date('2024-01-02'),
      roleGeneral: UserGeneralRoleEnum.Admin,
    },
    {
      id: '3',
      pseudo: 'Charlie',
      email: 'charlie@example.com',
      picture: 'path/to/charlie.jpg',
      createdAt: new Date('2024-01-03'),
      roleGeneral: UserGeneralRoleEnum.User,
    },
  ]);*/
  //public friendList: WritableSignal<UserModel[]> = signal([]);
}
