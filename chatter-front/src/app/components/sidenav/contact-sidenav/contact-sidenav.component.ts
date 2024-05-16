import {
  Component,
  InputSignal,
  input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { GetMeModel } from '../../../models/user.model';
import { SectionDetailUnitComponent } from '../section-detail-unit/section-detail-unit.component';
import { Router } from '@angular/router';
import { ButtonsSidenavComponent } from '../buttons-sidenav/buttons-sidenav.component';
import { MatSidenav } from '@angular/material/sidenav';
import { NgClass } from '@angular/common';
import { FriendStatusInvitation } from '../../../models/enums/friend-status-invitation.enum';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-contact-sidenav',
  standalone: true,
  imports: [
    SectionDetailUnitComponent,
    ButtonsSidenavComponent,
    MatSidenav,
    NgClass,
  ],
  templateUrl: './contact-sidenav.component.html',
  styleUrl: './contact-sidenav.component.scss',
})
export class ContactSidenavComponent {
  public getMe: InputSignal<GetMeModel | null> = input.required();
  public isExpanded: InputSignal<boolean> = input.required<boolean>();

  protected readonly FriendStatusInvitation = FriendStatusInvitation;

  constructor(private router: Router) {}

  goAddFriend() {
    this.router.navigate([`/friend/add`]);
  }
}
