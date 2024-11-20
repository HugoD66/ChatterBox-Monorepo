import {
  Component,
  effect,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { DiscussionComponent } from '../../components/blocs/discussion/discussion.component';
import { MessageModel } from '../../models/message.model';
import { GroupRoomProfilComponent } from '../../components/blocs/group-room-profil/group-room-profil.component';
import { GetMeModel, UserModel } from '../../models/user.model';
import { UserGeneralRoleEnum } from '../../enum/user.general.role.enum';
import { AuthService } from '../../services/auth.service';
import { FriendProfilComponent } from '../../components/blocs/friend-profil/friend-profil.component';
import { AddFriendSearchComponent } from '../../components/blocs/add-friend-search/add-friend-search.component';
import {
  openCloseFriendPrivateRoomAnimation,
  openCloseFriendProfilAnimation,
  openCloseFriendSearchAnimation,
} from '../../services/animation/animation';
import { RoomModel } from '../../models/room.model';

@Component({
  selector: 'app-group-room',
  standalone: true,
  imports: [
    DiscussionComponent,
    GroupRoomProfilComponent,
    FriendProfilComponent,
    AddFriendSearchComponent,
  ],
  templateUrl: './group-room.component.html',
  styleUrl: './group-room.component.scss',
  animations: [
    openCloseFriendProfilAnimation,
    openCloseFriendSearchAnimation,
    openCloseFriendPrivateRoomAnimation,
  ],
})
export class GroupRoomComponent {
  public messages: WritableSignal<MessageModel[]> = signal([]);
  public getMe: WritableSignal<GetMeModel | null> = signal(null);
  public room: WritableSignal<RoomModel | null> = signal(null);
  public friendInDiscussion: InputSignal<UserModel[] | UserModel> =
    input.required<UserModel[] | UserModel>();

  public isExpandedFriendProfil = false;
  public isExpandedDiscussion = true;

  constructor(private authService: AuthService) {
    effect(() => {
      this.authService.getMe().subscribe((getMe: GetMeModel) => {
        this.getMe.update(() => getMe);
      });

      this.isExpandedFriendProfil = true;
      this.isExpandedDiscussion = false;
    });
  }
}
