import {
  AfterViewInit,
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
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-add-friend',
  standalone: true,
  imports: [
    AddFriendProfilComponent,
    AddFriendSearchComponent,
    FriendProfilComponent,
    LoaderComponent,
  ],
  templateUrl: './add-friend.component.html',
  styleUrl: './add-friend.component.scss',
})
export class AddFriendComponent {
  public getMe: WritableSignal<UserModel | null> = signal(null);
  public profilSelected: WritableSignal<UserModel | null> = signal(null);

  constructor(private authService: AuthService) {
    this.authService.getMe().subscribe((me: UserModel) => {
      this.getMe.update(() => me);
      this.profilSelected.update(() => me);
    });
  }

  onUserclick($event: UserModel) {
    this.profilSelected.set($event);
  }
}
