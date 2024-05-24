import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
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
