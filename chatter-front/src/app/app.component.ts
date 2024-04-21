import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { UserModel } from './models/user.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public user: WritableSignal<UserModel | null> = signal(null);

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth/login']) ||
        this.router.navigate(['/auth/register']);
    } else {
      this.authService.getMe().subscribe((me: UserModel) => {
        this.user.update(() => me);
        if (this.user()) {
          //this.router.navigate(['']);
        }
      });
    }
  }
}
