import {
  AfterViewInit,
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
export class LayoutComponent implements AfterViewInit {
  public getMe: WritableSignal<UserModel | null> = signal(null);
  public isSidenavExpanded: boolean = true;
  public sidebarCollapsed = signal(false);

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}
  ngAfterViewInit(): void {
    this.authService.getMe().subscribe((me) => {
      console.log(me);
      if (!me) {
        this.router.navigate(['/auth/login']);
        return;
      }
      this.getMe.set(me);
    });
    console.log(this.getMe());
  }

  isExpandedChange(isExpanded: boolean): void {
    this.isSidenavExpanded = isExpanded;
    this.sidebarCollapsed.set(!isExpanded);
  }

  removeGetMe(): void {
    this.getMe.update(() => null as unknown as UserModel);
  }
}
