import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';
import { AddFriendProfilComponent } from '../../components/blocs/add-friend-profil/add-friend-profil.component';
import { AddFriendSearchComponent } from '../../components/blocs/add-friend-search/add-friend-search.component';
import { FriendProfilComponent } from '../../components/blocs/friend-profil/friend-profil.component';
import { UserModel } from '../../models/user.model';
import { UserGeneralRoleEnum } from '../../enum/user.general.role.enum';
import { AuthService } from '../../services/auth.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-add-friend',
  standalone: true,
  imports: [
    AddFriendProfilComponent,
    AddFriendSearchComponent,
    FriendProfilComponent,
  ],
  templateUrl: './add-friend.component.html',
  styleUrl: './add-friend.component.scss',
})
export class AddFriendComponent {
  public getMe: WritableSignal<UserModel | null> = signal(null);
  public friend: WritableSignal<UserModel> = signal({
    id: '1',
    pseudo: 'Alice',
    email: 'alice@example.com',
    picture: 'path/to/alice.jpg',
    createdAt: new Date('2024-01-01'),
    roleGeneral: UserGeneralRoleEnum.User,
  });
  constructor(private authService: AuthService) {
    this.authService.getMe().subscribe((me: UserModel) => {
      this.getMe.update(() => me);
    });

    //this.getMe.set(this.authService.getMeByAuthService());
    //console.log(this.getMe());
  }
}
