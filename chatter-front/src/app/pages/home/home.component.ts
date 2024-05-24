import {
  ChangeDetectionStrategy,
  Component,
  effect,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenav,
  MatSidenavContainer,
} from '@angular/material/sidenav';
import { MatButton } from '@angular/material/button';
import { GetMeModel, UserModel } from '../../models/user.model';
import { ProfilComponent } from '../../components/blocs/profil/profil.component';
import { LastMessageComponent } from '../../components/blocs/last-message/last-message.component';
import { FriendListComponent } from '../../components/blocs/friend-list/friend-list.component';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatDrawer,
    MatDrawerContainer,
    MatButton,
    MatSidenav,
    MatSidenavContainer,
    ProfilComponent,
    LastMessageComponent,
    FriendListComponent,
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public friends: WritableSignal<UserModel[]> = signal([]);
  public getMe: WritableSignal<GetMeModel> = signal(
    {} as unknown as GetMeModel,
  );

  constructor(private authService: AuthService) {
    effect(() => {
      this.authService.getMe().subscribe((getMe: GetMeModel) => {
        this.getMe.update(() => getMe);
      });
    });
  }

  ngOnInit() {}

  onUserUpdated() {
    this.authService.getMe().subscribe((me: GetMeModel) => {
      this.getMe.update(() => me);
      localStorage.setItem('currentUser', JSON.stringify(me));
    });
  }
}
