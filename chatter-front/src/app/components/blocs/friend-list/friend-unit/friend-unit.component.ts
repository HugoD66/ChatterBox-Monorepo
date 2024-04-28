import {
  Component,
  effect,
  input,
  InputSignal,
  model,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { DialogService } from '../../../../services/dialog.service';
import { UserModel } from '../../../../models/user.model';
import { Router } from '@angular/router';
import { RoomAddFriendService } from '../../../../services/room-add-friend.service';
import { environment } from '../../../../../env';

@Component({
  selector: 'app-friend-unit',
  standalone: true,
  imports: [MatDivider, MatIcon],
  templateUrl: './friend-unit.component.html',
  styleUrl: './friend-unit.component.scss',
})
export class FriendUnitComponent {
  public friend: InputSignal<UserModel | null> =
    input.required<UserModel | null>();
  public isAdded: WritableSignal<boolean> = signal(false);
  protected apiUrl = environment.apiUrl;

  public isPanelAddFriendToRoom: InputSignal<boolean> = input.required();
  constructor(
    private dialogService: DialogService,
    public roomAddFriendService: RoomAddFriendService,
    private router: Router,
  ) {
    effect(() => {
      //console.log(this.friend());
    });
  }

  public openDialog(user: UserModel): void {
    console.log(user);
    //this.dialogService.openDialog(this.friend());
  }

  onPrivateChat(friend: UserModel) {
    this.router.navigate([`/room/private/${friend.id}`]);
  }

  public addFriend(friend: any): void {
    console.log(friend);
    this.isAdded.set(true);
    this.roomAddFriendService.friendAdded.update((friends) => [
      ...friends,
      friend,
    ]);
    console.log(this.roomAddFriendService.friendAdded());
  }

  public removeFriend(userModel: UserModel) {
    this.isAdded.set(false);
    this.roomAddFriendService.friendAdded.update((friends) => {
      return friends.filter((f) => f.id !== this.friend()!.id);
    });
    console.log(this.roomAddFriendService.friendAdded());
  }
}
