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
import { MessageService } from '../../services/message.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FriendRelationModel } from '../../models/friend-relation.model';

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
  public getMe: WritableSignal<GetMeModel | null> = signal(null);
  public friendSelectedId: WritableSignal<string> = signal('');

  public friend: WritableSignal<UserModel> = signal({} as UserModel);

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe((params) => {
      //ICI ON RECUPERE L'ID DE L'ID DU MESSAGE. NON PAS DE L'UTILISATEUR
      this.friendSelectedId.set(params['friendId']);
    });

    this.authService.getMe().subscribe((me: GetMeModel) => {
      this.getMe.update(() => me);
      this.messageService
        .getDiscussion(this.friendSelectedId(), this.getMe()!.id)
        .subscribe((messages) => {
          this.messages.update(() => messages);
        });
    });

    effect(
      () => {
        this.getMe()!.friendships!.forEach((friend: FriendRelationModel) => {
          console.log(friend);
          console.log(this.friendSelectedId());
          if (this.friendSelectedId() === friend.id) {
            console.log('FRIEND');
            console.log(friend.id);
            this.friend.update(() => friend.friend);
          }
        });
      },
      { allowSignalWrites: true },
    );
  }
}
