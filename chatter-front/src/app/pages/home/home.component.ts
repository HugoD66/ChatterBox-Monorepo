import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Router } from '@angular/router';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenav,
  MatSidenavContainer,
} from '@angular/material/sidenav';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';
import { ProfilComponent } from '../../components/blocs/profil/profil.component';
import { LastMessageComponent } from '../../components/blocs/last-message/last-message.component';
import { FriendListComponent } from '../../components/blocs/friend-list/friend-list.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidenavComponent,
    MatDrawer,
    MatDrawerContainer,
    MatButton,
    MatSidenav,
    MatSidenavContainer,
    ProfilComponent,
    LastMessageComponent,
    FriendListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public getMe: BehaviorSubject<UserModel | null> =
    new BehaviorSubject<UserModel | null>(null);
  constructor() {}

  ngOnInit() {
    //this.authService.getMe().subscribe((me) => {
    //  console.log(me);
    //
    //  if (!me) {
    //    this.router.navigate(['/auth/login']);
    //  }
    //  this.getMe.set(me);
    //});
    //console.log(this.getMe());
  }
}
