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
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { ContactSidenavComponent } from './contact-sidenav/contact-sidenav.component';
import { RoomSidenavComponent } from './room-sidenav/room-sidenav.component';
import { IconsSidenavComponent } from './icons-sidenav/icons-sidenav.component';
import { ButtonsSidenavComponent } from './buttons-sidenav/buttons-sidenav.component';

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
    MatDivider,
    MatIcon,
    ContactSidenavComponent,
    RoomSidenavComponent,
    IconsSidenavComponent,
    ButtonsSidenavComponent,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  public getMe: InputSignal<UserModel | null> =
    input.required<UserModel | null>();
  public sidebarActivatedMode = signal(SidebarModeEnum.EXPANDED);
  public isExpanded = signal(false);
  @Output() isExpandedChange = new EventEmitter<boolean>();
  @Output() removeGetMe = new EventEmitter<UserModel>();

  constructor(private router: Router) {}

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

  removeGetChildMe() {
    this.removeGetMe.emit();
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
