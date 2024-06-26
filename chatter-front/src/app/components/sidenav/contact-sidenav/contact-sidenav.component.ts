import {
  Component,
  InputSignal,
  input,
  ChangeDetectionStrategy,
  WritableSignal,
  signal,
  computed,
  effect,
  Signal,
} from '@angular/core';
import { GetMeModel } from '../../../models/user.model';
import { SectionDetailUnitComponent } from '../section-detail-unit/section-detail-unit.component';
import { Router } from '@angular/router';
import { ButtonsSidenavComponent } from '../buttons-sidenav/buttons-sidenav.component';
import { MatSidenav } from '@angular/material/sidenav';
import { NgClass } from '@angular/common';
import { FriendStatusInvitation } from '../../../models/enums/friend-status-invitation.enum';
import { MatIcon } from '@angular/material/icon';
import { FriendRelationModel } from '../../../models/friend-relation.model';

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
  public friendAcceptedList: WritableSignal<FriendRelationModel[]> = signal([]);

  protected readonly FriendStatusInvitation = FriendStatusInvitation;

  constructor(private router: Router) {
    effect(
      () => {
        if (this.getMe()?.friendships) {
          this.friendAcceptedList.set(
            this.getMe()!.friendships!.filter(
              (friend) => friend.status === FriendStatusInvitation.ACCEPTED,
            ),
          );
        } else {
          this.friendAcceptedList.set([]);
        }
        console.log(this.friendAcceptedList());
      },
      { allowSignalWrites: true },
    );
  }

  goAddFriend() {
    this.router.navigate([`/friend/add`]);
  }

  protected readonly FriendRelationModel = FriendRelationModel;
}
