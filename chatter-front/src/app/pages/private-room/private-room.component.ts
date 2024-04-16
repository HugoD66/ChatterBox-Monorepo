import {
  AfterViewInit,
  Component,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FriendProfilComponent } from '../../components/blocs/friend-profil/friend-profil.component';
import { DiscussionComponent } from '../../components/blocs/discussion/discussion.component';
import { UserModel } from '../../models/user.model';
import { UserGeneralRoleEnum } from '../../enum/user.general.role.enum';
import { MessageModel } from '../../models/message.model';
import { MessageService } from '../../services/message.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-private-room',
  standalone: true,
  imports: [FriendProfilComponent, DiscussionComponent],
  templateUrl: './private-room.component.html',
  styleUrl: './private-room.component.scss',
})
export class PrivateRoomComponent implements OnInit {
  //TODO AJOUTER LOADCOMPONENT, et cas ou array de messages() vide
  //TODO !!! Erreur sur le messageServiceGetDiscussion
  public messages: WritableSignal<MessageModel[]> = signal([]);
  public getMe: WritableSignal<UserModel | null> = signal(null);

  public friend: WritableSignal<UserModel> = signal({
    id: '181d1ae7-bcf2-4080-a517-0055fa34b4bd',
    pseudo: 'Alice',
    email: 'alice@example.com',
    picture: 'path/to/alice.jpg',
    createdAt: new Date('2024-01-01'),
    roleGeneral: UserGeneralRoleEnum.User,
  });

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
  ) {
    this.getMe.update(() => this.authService.getMeByAuthService());
  }

  ngOnInit() {
    this.messageService
      .getDiscussion(this.friend().id, this.getMe()!.id)
      .subscribe((messages) => {
        this.messages.update(() => messages);
      });
  }
}
