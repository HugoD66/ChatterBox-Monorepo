import {
  ChangeDetectionStrategy,
  Component,
  effect,
  signal,
  WritableSignal,
} from '@angular/core';
import { FriendProfilComponent } from '../../components/blocs/friend-profil/friend-profil.component';
import { DiscussionComponent } from '../../components/blocs/discussion/discussion.component';
import { GetMeModel, UserModel } from '../../models/user.model';
import { MessageModel } from '../../models/message.model';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { AuthService } from '../../services/auth.service';
import {
  openCloseFriendPrivateRoomAnimation,
  openCloseFriendProfilAnimation,
} from '../../services/animation/animation';
import { AddFriendSearchComponent } from '../../components/blocs/add-friend-search/add-friend-search.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-private-room',
  standalone: true,
  imports: [
    FriendProfilComponent,
    DiscussionComponent,
    FriendProfilComponent,
    AddFriendSearchComponent,
  ],
  templateUrl: './private-room.component.html',
  styleUrl: './private-room.component.scss',
  animations: [
    openCloseFriendProfilAnimation,
    openCloseFriendPrivateRoomAnimation,
  ],
})
export class PrivateRoomComponent {
  public messages: WritableSignal<MessageModel[]> = signal([]);
  public getMe: WritableSignal<GetMeModel | null> = signal(null);
  public friendId: WritableSignal<string | null> = signal(
    this.route.snapshot.paramMap.get('id'),
  );
  public friend: WritableSignal<UserModel> = signal({} as UserModel);
  public isExpandedFriendProfil = false;
  public isExpandedDiscussion = true;

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
    effect(() => {
      this.authService.getMe().subscribe((getMe: GetMeModel) => {
        this.getMe.update(() => getMe);
      });
    });

    this.roomService.getRoomyUser(this.friendId()!).subscribe((room) => {
      console.log(room);
      //TODO DO THAT ,
      this.friend.update(() => room.participants[0]);
      this.messages.update(() => room.messages);
      console.log(this.messages());
    });
    this.isExpandedDiscussion = true;
    // this.panelOpening(true);
  }

  public panelOpening(event: boolean): void {
    console.log('coucou');
    this.isExpandedFriendProfil = event;
    this.isExpandedDiscussion = !event;
  }
}
