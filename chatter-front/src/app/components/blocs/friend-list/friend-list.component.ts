import {
  ChangeDetectionStrategy,
  Component,
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
  public friendList: WritableSignal<UserModel[] | null> = signal([]);
  public getMe: InputSignal<GetMeModel> = input.required<GetMeModel>();
  public isPanelAddFriendToRoom: InputSignal<boolean> = input.required();

  constructor() {
    /* effect(
      () => {
        console.log(this.getMe());
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
    );*/
  }
}
