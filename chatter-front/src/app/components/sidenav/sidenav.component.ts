import { Component, Input, WritableSignal } from '@angular/core';
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
@Component({
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
  @Input() getMe!: WritableSignal<UserModel | null>;
  @Input() showFiller!: boolean;
  //showFiller: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    if (!this.getMe()) {
      this.router.navigate(['/auth']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.getMe.set(null);
    this.router.navigate(['/auth']);
  }
}
