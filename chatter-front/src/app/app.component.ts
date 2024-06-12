import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TruncateLongPipe } from './pipe/TruncateLongPipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    //BrowserAnimationsModule,
    TruncateLongPipe,
    SidenavComponent,
  ],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth/login']) ||
        this.router.navigate(['/auth/register']);
    }
  }
}
