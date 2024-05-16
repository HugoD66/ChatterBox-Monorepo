import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';
import { AddFriendSearchComponent } from '../../components/blocs/add-friend-search/add-friend-search.component';
import { FriendProfilComponent } from '../../components/blocs/friend-profil/friend-profil.component';
import { GetMeModel, UserModel } from '../../models/user.model';
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
  public getMe: WritableSignal<GetMeModel | null> = signal(null);
  public profilSelected: WritableSignal<UserModel | null> = signal(null);

  constructor() {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      this.getMe.update(() => JSON.parse(userJson));
    }
  }

  onUserclick($event: UserModel) {
    this.profilSelected.set($event);
  }
}
