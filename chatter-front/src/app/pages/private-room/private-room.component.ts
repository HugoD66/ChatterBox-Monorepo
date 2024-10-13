import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
import { switchMap } from 'rxjs';

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
  public friendId: WritableSignal<string | null> = signal(null);
  public friend: WritableSignal<UserModel | null> = signal(null);
  public isExpandedFriendProfil = false;
  public isExpandedDiscussion = true;

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          this.friendId.update(() => id);
          return this.authService.getMe();
        }),
      )
      .subscribe((getMe: GetMeModel) => {
        this.getMe.update(() => getMe);

        if (!this.getMe()) {
          return;
        }

        this.roomService.getRoomyUser(this.friendId()!).subscribe((room) => {
          if (!room) {
            return;
          }
          if (this.getMe()!.id === room.owner.id) {
            this.friend.update(() => room.participants[0]);
          } else {
            this.friend.update(() => room.owner);
          }
          this.messages.update(() => room.messages);
          console.log(this.messages());
        });
      });
    this.isExpandedDiscussion = true;
  }

  public panelOpening(event: boolean): void {
    console.log('coucou');
    this.isExpandedFriendProfil = event;
    this.isExpandedDiscussion = !event;
  }
}
