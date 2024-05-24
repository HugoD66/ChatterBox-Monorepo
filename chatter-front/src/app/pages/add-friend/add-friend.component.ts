import {
  ChangeDetectionStrategy,
  Component,
  effect,
  signal,
  WritableSignal,
} from '@angular/core';
import { AddFriendSearchComponent } from '../../components/blocs/add-friend-search/add-friend-search.component';
import { FriendProfilComponent } from '../../components/blocs/friend-profil/friend-profil.component';
import { GetMeModel, UserModel } from '../../models/user.model';
import { LoaderComponent } from '../../components/loader/loader.component';
import { NgClass, NgStyle } from '@angular/common';
import { AuthService } from '../../services/auth.service';

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
  public getMe: WritableSignal<GetMeModel | null> = signal(null);
  public isLoading: WritableSignal<boolean> = signal(true);
  public profilSelected: WritableSignal<UserModel | null> = signal(null);

  constructor(private authService: AuthService) {
    this.authService.getMe().subscribe((getMe: GetMeModel) => {
      this.getMe.update(() => getMe);
      this.isLoading.set(false);
    });
  }

  onUserclick($event: UserModel) {
    this.profilSelected.set($event);
  }

  refreshGetMeEvent() {
    this.authService.getMe().subscribe((getMe: GetMeModel) => {
      this.getMe.update(() => getMe);
      this.isLoading.set(false);
    });
  }
}
