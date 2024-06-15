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
import { GetMeModel } from '../../../models/user.model';
import { FriendStatusInvitation } from '../../../models/enums/friend-status-invitation.enum';
import { FriendRelationModel } from '../../../models/friend-relation.model';
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
  public friendAcceptedList: WritableSignal<FriendRelationModel[]> = signal([]);

  constructor(private router: Router) {
    effect(
      () => {
        const acceptedFriendsCount =
          this.getMe().friendships?.filter(
            (friendship: FriendRelationModel): boolean =>
              friendship.status === FriendStatusInvitation.ACCEPTED,
          ).length || 0;
        this.countFriends.update(() => acceptedFriendsCount);

        if (this.getMe()?.friendships) {
          this.friendAcceptedList.set(
            this.getMe()!.friendships!.filter(
              (friend) => friend.status === FriendStatusInvitation.ACCEPTED,
            ),
          );
        } else {
          this.friendAcceptedList.set([]);
        }
        console.log(this.friendAcceptedList());
      },
      { allowSignalWrites: true },
    );
  }

  protected readonly FriendStatusInvitation = FriendStatusInvitation;

  onUserList() {
    this.router.navigate(['/friend/add']);
  }
}
