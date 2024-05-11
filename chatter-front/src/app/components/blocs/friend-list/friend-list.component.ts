import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  InputSignal,
  model,
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
  public isLoading: WritableSignal<boolean> = signal(true);
  public friendList: WritableSignal<UserModel[] | null> = signal([]);
  public getMe: InputSignal<UserModel> = input.required<UserModel>();
  public isPanelAddFriendToRoom: InputSignal<boolean> = input.required();

  constructor() {
    effect(
      () => {
        this.friendList.update(
          () =>
            this.getMe()?.friendships?.map(
              (f: FriendRelationModel) => f.friend,
            ) ?? null,
        );
        if (this.friendList() !== null) {
          this.isLoading.update(() => false);
        }
      },
      { allowSignalWrites: true },
    );
  }
}
