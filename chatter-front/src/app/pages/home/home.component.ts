import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenav,
  MatSidenavContainer,
} from '@angular/material/sidenav';
import { MatButton } from '@angular/material/button';
import { UserModel } from '../../models/user.model';
import { ProfilComponent } from '../../components/blocs/profil/profil.component';
import { LastMessageComponent } from '../../components/blocs/last-message/last-message.component';
import { FriendListComponent } from '../../components/blocs/friend-list/friend-list.component';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidenavComponent,
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
  public getMe: WritableSignal<UserModel | null> = signal(null);

  constructor(private authService: AuthService) {}

  ngOnInit() {
    //TODO change to this.getMe.set(this.authService.getMeByAuthService());
    this.authService.getMe().subscribe((me: UserModel) => {
      this.getMe.update(() => me);
    });
  }

  onUserUpdated() {
    this.authService.getMe().subscribe((me: UserModel) => {
      this.getMe.update(() => me);
    });
  }
}
