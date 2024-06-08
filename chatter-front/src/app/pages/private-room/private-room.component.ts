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

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-private-room',
  standalone: true,
  imports: [FriendProfilComponent, DiscussionComponent],
  templateUrl: './private-room.component.html',
  styleUrl: './private-room.component.scss',
})
export class PrivateRoomComponent {
  public messages: WritableSignal<MessageModel[]> = signal([]);
  public getMe: WritableSignal<GetMeModel | null> = signal(null);
  public roomId: WritableSignal<string | null> = signal(
    this.route.snapshot.paramMap.get('id'),
  );
  public friend: WritableSignal<UserModel> = signal({} as UserModel);

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

    //On récupére l'id de l'user et non pas de la room dans le paramsMap
    //utiliser plutot dans room sevice getRoomByUser
    this.roomService.getRoom(this.roomId()!).subscribe((room) => {
      console.log(room);
      this.friend.update(() => room.participants[0]);
      this.messages.update(() => room.messages);
      console.log(this.messages());
    });
  }
}
