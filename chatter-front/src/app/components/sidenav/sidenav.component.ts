import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  InputSignal,
  Output,
  signal,
} from '@angular/core';
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { NgClass } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { UserModel } from '../../models/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

enum SidebarModeEnum {
  COLLAPSED = 'collapsed',
  EXPANDED = 'expanded',
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    NgClass,
    MatSidenavModule,
    MatDrawer,
    MatDrawerContainer,
    MatButton,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  public getMe: InputSignal<UserModel | null> =
    input.required<UserModel | null>();
  public sidebarActivatedMode = signal(SidebarModeEnum.EXPANDED);
  public isExpanded = signal(true);
  @Output() isExpandedChange = new EventEmitter<boolean>();
  @Output() removeGetMe = new EventEmitter<UserModel>();

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  changeSidenavMode(): void {
    if (this.isExpanded()) {
      this.sidebarActivatedMode.set(SidebarModeEnum.COLLAPSED);
      this.isExpanded.set(false);
    } else {
      this.sidebarActivatedMode.set(SidebarModeEnum.EXPANDED);
      this.isExpanded.set(true);
    }
    this.isExpandedChange.emit(this.isExpanded());
  }
  logout(): void {
    this.authService.logout();
    this.removeGetMe.emit();
    this.router.navigate(['/auth/login']);
  }
  goHome(): void {
    this.router.navigate(['/home']);
  }

  goCreateRoom() {
    this.router.navigate(['room/create']);
  }

  goDiscussion() {
    this.router.navigate(['/room/private']);
  }
}
