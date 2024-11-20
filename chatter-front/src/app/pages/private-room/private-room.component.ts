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
import { switchMap } from 'rxjs';
import { RoomModel } from '../../models/room.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-private-room',
  standalone: true,
  imports: [FriendProfilComponent, DiscussionComponent, FriendProfilComponent],
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
  public room: WritableSignal<RoomModel | null> = signal(null);
  public friendId: WritableSignal<string | null> = signal(null);
  public friend: WritableSignal<UserModel | null> = signal(null);
  public isExpandedFriendProfil = false;
  public isExpandedDiscussion = true;

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
    effect(
      () => {
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

            this.roomService
              .getRoomyUser(this.friendId()!)
              .subscribe((room) => {
                if (!room) {
                  return;
                }
                this.room.set(room);
                if (this.getMe()!.id === room.owner.id) {
                  this.friend.update(() => room.participants[0]);
                } else {
                  this.friend.update(() => room.owner);
                }
                this.messages.update(() => room.messages);
              });
          });
        this.isExpandedDiscussion = true;
      },
      { allowSignalWrites: true },
    );
  }

  public panelOpening(event: boolean): void {
    this.isExpandedFriendProfil = event;
    this.isExpandedDiscussion = !event;
  }
}
