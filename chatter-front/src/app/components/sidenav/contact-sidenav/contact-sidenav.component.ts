import {
  Component,
  InputSignal,
  input,
  ChangeDetectionStrategy,
  WritableSignal,
  signal,
  effect,
  computed,
} from '@angular/core';
import { GetMeModel } from '../../../models/user.model';
import { SectionDetailUnitComponent } from '../section-detail-unit/section-detail-unit.component';
import { Router } from '@angular/router';
import { ButtonsSidenavComponent } from '../buttons-sidenav/buttons-sidenav.component';
import { MatSidenav } from '@angular/material/sidenav';
import { NgClass } from '@angular/common';
import {
  FriendStatusIndexEnum,
  FriendStatusInvitation,
} from '../../../models/enums/friend-status-invitation.enum';
import { MatIcon } from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-contact-sidenav',
  standalone: true,
  imports: [
    SectionDetailUnitComponent,
    ButtonsSidenavComponent,
    MatSidenav,
    NgClass,
    MatIcon,
  ],
  templateUrl: './contact-sidenav.component.html',
  styleUrl: '../sections-contact-room.component.scss',
})
export class ContactSidenavComponent {
  public getMe: InputSignal<GetMeModel | null> = input.required();
  public isExpanded: InputSignal<boolean> = input.required<boolean>();
  public friendAcceptedList = computed(() => {
    if (!this.getMe()!.friends) {
      return [];
    }
    return this.getMe()!.friends[FriendStatusIndexEnum.ACCEPTED];
  });

  protected readonly FriendStatusInvitation = FriendStatusInvitation;

  constructor(private router: Router) {
    effect(
      () => {
        if (!this.getMe()!.friends) {
          return;
        }
      },
      { allowSignalWrites: true },
    );
  }

  goAddFriend() {
    this.router.navigate([`/friend/add`]);
  }
}
