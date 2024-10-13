import {
  Component,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import {
  DialogService,
  SettingsOrRemoveFriendDialogData,
} from '../../../../services/dialog.service';
import { GetMeModel, UserModel } from '../../../../models/user.model';
import { Router } from '@angular/router';
import { RoomAddFriendService } from '../../../../services/room-add-friend.service';
import { environment } from '../../../../../env';
import { RoomService } from '../../../../services/room.service';
import { FriendRelationModel } from '../../../../models/friend-relation.model';
import { DialogTypeEnum } from '../../../../enum/dialog.type.enum';
import { FriendService } from '../../../../services/friend.service';

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
    private friendService: FriendService,
    public roomAddFriendService: RoomAddFriendService,
    private router: Router,
  ) {}

  public async openDialog(
    user: UserModel,
    type: 'remove' | 'settings',
  ): Promise<void> {
    const relation = await this.friendService
      .getFriend(this.getMe()!.id, this.friend()!.id)
      .toPromise();

    if (!relation) {
      return;
    }

    const dialogData = new SettingsOrRemoveFriendDialogData(user, relation);
    type === 'remove'
      ? this.dialogService.openDialog(
          this.getMe()!,
          dialogData,
          DialogTypeEnum.REMOVE_FRIEND,
        )
      : this.dialogService.openDialog(
          this.getMe()!,
          dialogData,
          DialogTypeEnum.SETTINGS_FRIEND,
        );
  }

  public async goToUserConversation(userId?: string) {
    this.router.navigate([`/room/private/${userId}`]);
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
