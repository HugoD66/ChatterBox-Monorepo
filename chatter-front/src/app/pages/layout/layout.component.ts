import { AfterViewInit, Component, signal } from '@angular/core';
import { FriendListComponent } from '../../components/blocs/friend-list/friend-list.component';
import { LastMessageComponent } from '../../components/blocs/last-message/last-message.component';
import { ProfilComponent } from '../../components/blocs/profil/profil.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { Router, RouterOutlet } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject } from 'rxjs';

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
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements AfterViewInit {
  public getMe: BehaviorSubject<UserModel | null> =
    new BehaviorSubject<UserModel | null>(null);
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
      }
      this.getMe.next(me);
    });
    console.log(this.getMe.value);
  }

  isExpandedChange(isExpanded: boolean): void {
    this.isSidenavExpanded = isExpanded;
    this.sidebarCollapsed.set(!isExpanded);
  }
}
