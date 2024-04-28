import {
  Component,
  InputSignal,
  signal,
  WritableSignal,
  input,
  effect,
  ChangeDetectionStrategy,
} from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { FriendRelationModel } from '../../../models/friend-relation.model';
import { SectionDetailUnitComponent } from '../section-detail-unit/section-detail-unit.component';
import { Router } from '@angular/router';
import { ButtonsSidenavComponent } from '../buttons-sidenav/buttons-sidenav.component';
import { MatSidenav } from '@angular/material/sidenav';
import { NgClass } from '@angular/common';

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
  public getMe: InputSignal<UserModel | null> = input.required();
  public friendList: WritableSignal<UserModel[]> = signal([]);
  public isExpanded: InputSignal<boolean> = input.required<boolean>();

  constructor(private router: Router) {
    effect(
      () => {
        console.log(this.getMe());
        this.friendList.update(
          () =>
            this.getMe()?.friendships?.map(
              (f: FriendRelationModel) => f.friend,
            ) ?? [],
        );
        console.log(this.friendList());
      },
      { allowSignalWrites: true },
    );
  }

  goAddFriend() {
    this.router.navigate([`/friend/add`]);
  }
}
