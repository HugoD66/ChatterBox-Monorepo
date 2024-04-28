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
  public friends: WritableSignal<UserModel[]> = signal([]);
  public getMe: InputSignal<UserModel> = input.required<UserModel>();
  public isPanelAddFriendToRoom: InputSignal<boolean> = input.required();

  constructor(private friendService: FriendService) {
    effect(() => {
      if (this.getMe().id) {
        this.friendService.getFriends(this.getMe().id).subscribe((friends) => {
          //console.log(friends);
          this.friends.update(() => friends);
          this.isLoading.set(false);
        });
      }
    });
  }
}
