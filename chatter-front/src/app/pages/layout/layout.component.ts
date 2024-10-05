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

  constructor(private authService: AuthService) {
    effect(() => {
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
}
