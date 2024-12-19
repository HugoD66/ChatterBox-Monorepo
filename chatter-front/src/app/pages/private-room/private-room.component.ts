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
import { MessageService } from '../../services/message.service';
import { WebSocketService } from '../../socket/socket.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-private-room',
  standalone: true,
  imports: [FriendProfilComponent, DiscussionComponent],
  templateUrl: './private-room.component.html',
  styleUrls: ['./private-room.component.scss'],
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
  public scrollToBottom: WritableSignal<boolean> = signal(false);
  constructor(
    private webSocketService: WebSocketService,
    private roomService: RoomService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
    this.initData();
    this.listenForMessages();
  }

  private initData(): void {
    effect(() => {
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
          if (!this.getMe()) return;

          this.roomService.getRoomyUser(this.friendId()!).subscribe((room) => {
            if (!room) return;
            this.room.set(room);
            this.friend.update(() =>
              this.getMe()!.id === room.owner.id
                ? room.participants[0]
                : room.owner,
            );
          });
        });
    }, { allowSignalWrites: true });

    effect(() => {
      if (!this.room()) return;
      this.messageService
        .getDiscussion(this.room()!.id)
        .subscribe((messages) => {
          this.messages.set(messages);
          this.isExpandedDiscussion = true;
          this.scrollBottom()

        });

    }, { allowSignalWrites: true });
  }

  private listenForMessages(): void {
    this.webSocketService.connect();
    this.webSocketService.listen('newMessageChat').subscribe((data: unknown) => {
      const message = data as MessageModel;
      if (this.room()?.id === message.roomId) {
        this.messages.update((messages) => [...messages, message]);

        this.scrollBottom()

      }
    });
  }

  public panelOpening(event: boolean): void {
    this.isExpandedFriendProfil = event;
    this.isExpandedDiscussion = !event;
  }

  public scrollBottom() {
    this.scrollToBottom.set(true);
    setTimeout(() => {
      this.scrollToBottom.set(false);
    }, 100)
  }
}
