import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidenavComponent, MatDrawer, MatDrawerContainer, MatButton],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  showFiller: boolean = false;

  public getMe: WritableSignal<boolean> = signal(true); //Change boolean to usermodel
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    if (!this.getMe()) {
      this.router.navigate(['/auth']);
    }
  }

  additionalClickAction(): void {
    console.log('Action supplémentaire lors du clic du bouton!');
  }
  ngOnInit() {}

  logout(): void {
    this.getMe.set(false);
    this.authService.logout();
    console.log(this.getMe());
    this.router.navigate(['/auth']);
  }
}
