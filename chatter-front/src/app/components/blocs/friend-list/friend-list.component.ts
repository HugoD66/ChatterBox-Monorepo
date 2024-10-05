import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
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
import {
  FriendStatusIndexEnum,
  FriendStatusInvitation,
} from '../../../models/enums/friend-status-invitation.enum';
import { Router } from '@angular/router';
import { FriendModel } from '../../../models/friend-relation.model';
import { FriendFormatservice } from '../../../services/friend-format.service';

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
  public friendAcceptedList: WritableSignal<FriendModel[]> = signal([]);

  protected readonly FriendStatusInvitation = FriendStatusInvitation;
  private friendFormatService = inject(FriendFormatservice);

  constructor(private router: Router) {
    effect(
      () => {
        const getMeInformations: GetMeModel = this.getMe();

        if (!getMeInformations || !getMeInformations.friends) {
          this.friendAcceptedList.set([]);
          return;
        }

        this.countFriends.set(
          this.friendFormatService.countFriends(this.getMe()!.friends),
        );
        this.friendAcceptedList.set(
          getMeInformations.friends[FriendStatusIndexEnum.ACCEPTED],
        );
      },
      { allowSignalWrites: true },
    );
  }

  protected onUserList() {
    this.router.navigate(['/friend/add']);
  }
}
