import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidenavComponent, MatDrawer, MatDrawerContainer, MatButton],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  showFiller: boolean = false;
  public getMe: WritableSignal<UserModel | null> = signal(null);
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    const getUser = this.authService.getMe().subscribe(
      (user) => {
        this.getMe.set(user);
        if (!this.getMe()) {
          this.router.navigate(['/auth']);
        }
      },
      (error) => {
        console.error('error', error);
        this.router.navigate(['/auth']);
      },
    );
    console.log('getUser', getUser);
    //this.getMe.set(getUser);
    if (!this.getMe()) {
      this.router.navigate(['/auth']);
    }
  }

  additionalClickAction(): void {
    console.log('Action supplémentaire lors du clic du bouton!');
  }
  ngOnInit() {}

  logout(): void {
    this.authService.logout();
    this.getMe.set(null);
    this.router.navigate(['/auth']);
  }
}
