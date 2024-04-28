import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';
import { FriendListComponent } from '../../components/blocs/friend-list/friend-list.component';
import { LastMessageComponent } from '../../components/blocs/last-message/last-message.component';
import { ProfilComponent } from '../../components/blocs/profil/profil.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { Router, RouterOutlet } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    FriendListComponent,
    LastMessageComponent,
    ProfilComponent,
    SidenavComponent,
    RouterOutlet,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  public getMe: WritableSignal<UserModel | null> = signal(null);
  public isSidenavExpanded: boolean = true;
  public sidebarCollapsed = signal(true);

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    //TODO change to this.getMe.set(this.authService.getMeByAuthService());
    this.authService.getMe().subscribe((me: UserModel) => {
      this.getMe.update(() => me);
    });
  }

  isExpandedChange(isExpanded: boolean): void {
    this.isSidenavExpanded = isExpanded;
    this.sidebarCollapsed.set(!isExpanded);
  }

  removeGetMe(): void {
    this.getMe.update(() => null);
  }
}
