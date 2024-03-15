import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidenavComponent, MatDrawer, MatDrawerContainer],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  showFiller: boolean = false;

  public getMe: WritableSignal<boolean> = signal(true); //Change boolean to usermodel
  constructor(private router: Router) {
    if (!this.getMe()) {
      this.router.navigate(['/login']);
    }
  }

  additionalClickAction(): void {
    console.log('Action supplémentaire lors du clic du bouton!');
  }
  ngOnInit() {}
}
