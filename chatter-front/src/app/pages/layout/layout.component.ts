import {
  ChangeDetectionStrategy,
  Component,
  effect,
  signal,
  WritableSignal,
} from '@angular/core';
import { LastMessageComponent } from '../../components/blocs/last-message/last-message.component';
import { ProfilComponent } from '../../components/blocs/profil/profil.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { GetMeModel } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { PopupService } from '../../services/popup.service';
import { FriendService } from '../../services/friend.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
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
  public getMe: WritableSignal<GetMeModel> = signal(
    {} as unknown as GetMeModel,
  );
  public isSidenavExpanded: boolean = true;
  public sidebarCollapsed = signal(true);
  public friendListRefreshNeeded: Subscription;
  public userListRefrehNeeded: Subscription;

  constructor(
    private authService: AuthService,
    private popupService: PopupService,
    private friendService: FriendService,
  ) {
    effect(() => {
      this.authService.getMe().subscribe((getMe: GetMeModel) => {
        this.getMe.update(() => getMe);
      });
    });
    this.friendListRefreshNeeded =
      this.popupService.friendListRefreshNeeded.subscribe(() => {
        console.log('ICI C EST LE REFRESH');
        this.authService.getMe().subscribe((getMe: GetMeModel) => {
          this.getMe.update(() => getMe);
        });
      });
    this.userListRefrehNeeded =
      this.friendService.userListRefreshNeeded.subscribe(() => {
        console.log('ICI C EST LE REFRESH DU FRIEND SERVICE ');
        this.authService.getMe().subscribe((getMe: GetMeModel) => {
          this.getMe.update(() => getMe);
        });
      });
  }

  isExpandedChange(isExpanded: boolean): void {
    this.isSidenavExpanded = isExpanded;
    this.sidebarCollapsed.set(!isExpanded);
  }

  removeGetMe(): void {
    this.authService.logout();
    this.getMe.update(() => {
      return {} as GetMeModel;
    });
  }

  public ngOnDestroy(): void {
    if (this.userListRefrehNeeded) {
      this.userListRefrehNeeded.unsubscribe();
    }
    if (this.friendListRefreshNeeded) {
      this.friendListRefreshNeeded.unsubscribe();
    }
  }
}
