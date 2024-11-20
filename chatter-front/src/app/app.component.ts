import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WebSocketService } from './socket/socket.service';
import { ThemeService } from './services/theme.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterOutlet, RouterModule],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private webSocketService: WebSocketService,
    private themeService: ThemeService,
  ) {
    if (!this.authService.isLoggedIn()) {
      this.webSocketService.connect();
      this.router.navigate(['/auth/login']) ||
        this.router.navigate(['/auth/register']);
    }

    this.themeService.initThemeOnStart();
  }
}
