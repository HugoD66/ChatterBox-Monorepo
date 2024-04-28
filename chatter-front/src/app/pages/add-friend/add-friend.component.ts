import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';
import { AddFriendSearchComponent } from '../../components/blocs/add-friend-search/add-friend-search.component';
import { FriendProfilComponent } from '../../components/blocs/friend-profil/friend-profil.component';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-add-friend',
  standalone: true,
  imports: [
    AddFriendSearchComponent,
    FriendProfilComponent,
    LoaderComponent,
    NgStyle,
    NgClass,
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
      this.profilSelected.update(() => null);
    });
  }

  onUserclick($event: UserModel) {
    this.profilSelected.set($event);
  }
}
