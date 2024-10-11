import {
  Component,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { DialogService } from '../../../../services/dialog.service';
import { GetMeModel, UserModel } from '../../../../models/user.model';
import { Router } from '@angular/router';
import { RoomAddFriendService } from '../../../../services/room-add-friend.service';
import { environment } from '../../../../../env';
import { RoomService } from '../../../../services/room.service';
import { RoomModel } from '../../../../models/room.model';

@Component({
  selector: 'app-friend-unit',
  standalone: true,
  imports: [MatDivider, MatIcon],
  templateUrl: './friend-unit.component.html',
  styleUrl: './friend-unit.component.scss',
})
export class FriendUnitComponent {
  public getMe: InputSignal<GetMeModel | null> =
    input.required<GetMeModel | null>();
  public friend: InputSignal<UserModel | null> =
    input.required<UserModel | null>();
  public isAdded: WritableSignal<boolean> = signal(false);
  public isPanelAddFriendToRoom: InputSignal<boolean> = input.required();

  protected apiUrl = environment.apiUrl;

  constructor(
    private dialogService: DialogService,
    private roomService: RoomService,
    public roomAddFriendService: RoomAddFriendService,
    private router: Router,
  ) {}

  public openDialog(user: UserModel): void {
    console.log(user);
  }

  async onPrivateChat(friend: UserModel) {
    console.log(this.getMe()!.id, friend.id);
    try {
      this.roomService
        .getRoomByUser({
          userId: this.getMe()!.id,
          participantId: friend.id,
        })
        .subscribe((room: RoomModel) => {
          this.router.navigate([`/room/private/${room.id}`]);
        });
    } catch (error) {
      console.error('Failed to get room', error);
    }
  }

  public addFriend(friend: UserModel): void {
    console.log(friend);
    this.isAdded.set(true);
    this.roomAddFriendService.friendAdded.update((friends: UserModel[]) => [
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
