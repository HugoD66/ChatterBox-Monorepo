import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { LoaderComponent } from '../../loader/loader.component';
import { FriendUnitComponent } from './friend-unit/friend-unit.component';
import { GetMeModel, UserModel } from '../../../models/user.model';
import { FriendStatusInvitation } from '../../../models/enums/friend-status-invitation.enum';
import { Router } from '@angular/router';

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
  public getMe: InputSignal<GetMeModel> = input.required<GetMeModel>();
  public isPanelAddFriendToRoom: InputSignal<boolean> = input.required();
  public countFriends: WritableSignal<number> = signal(0);
  public friendAcceptedList: WritableSignal<UserModel[]> = signal([]);

  protected readonly FriendStatusInvitation = FriendStatusInvitation;

  constructor(private router: Router) {
    effect(
      () => {
        const getMeInformations: GetMeModel = this.getMe();

        if (!getMeInformations || !getMeInformations.friends) {
          this.countFriends.set(0);
          this.friendAcceptedList.set([]);
          return;
        }

        const acceptedFriendsCount = getMeInformations.friends.length || 0;
        this.countFriends.set(acceptedFriendsCount);
        this.friendAcceptedList.set(getMeInformations.friends);
      },
      { allowSignalWrites: true },
    );
  }

  protected onUserList() {
    this.router.navigate(['/friend/add']);
  }
}
