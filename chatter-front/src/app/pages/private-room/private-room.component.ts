import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  InputSignal,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { FriendProfilComponent } from '../../components/blocs/friend-profil/friend-profil.component';
import { DiscussionComponent } from '../../components/blocs/discussion/discussion.component';
import { UserModel } from '../../models/user.model';
import { MessageModel } from '../../models/message.model';
import { MessageService } from '../../services/message.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-private-room',
  standalone: true,
  imports: [FriendProfilComponent, DiscussionComponent],
  templateUrl: './private-room.component.html',
  styleUrl: './private-room.component.scss',
})
export class PrivateRoomComponent {
  //TODO AJOUTER LOADCOMPONENT, et cas ou array de messages() vide
  //TODO !!! Erreur sur le messageServiceGetDiscussion
  public messages: WritableSignal<MessageModel[]> = signal([]);
  public getMe: WritableSignal<UserModel | null> = signal(null);
  public friendSelectedId: WritableSignal<string> = signal('');

  public friend: WritableSignal<UserModel> = signal({} as UserModel);

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe((params) => {
      this.friendSelectedId.set(params['friendId']);
    });

    this.authService.getMe().subscribe((me: UserModel) => {
      this.getMe.update(() => me);
      this.messageService
        .getDiscussion(this.friendSelectedId(), this.getMe()!.id)
        .subscribe((messages) => {
          this.messages.update(() => messages);
        });
    });

    this.getMe()?.friendships?.forEach((friend) => {
      console.log(friend.friend);
      if (this.friendSelectedId() === friend.friend.id) {
        this.friend.update(() => friend.friend);
      }
    });
    effect(() => {}, { allowSignalWrites: true });
  }
}
