import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { GetMeModel } from '../../../models/user.model';
import { FriendStatusInvitation } from '../../../models/enums/friend-status-invitation.enum';
import { FriendRelationModel } from '../../../models/friend-relation.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-buttons-sidenav',
  standalone: true,
  imports: [NgClass, MatButton],
  templateUrl: './buttons-sidenav.component.html',
  styleUrl: './buttons-sidenav.component.scss',
})
export class ButtonsSidenavComponent {
  public isExpanded: InputSignal<boolean> = input.required<boolean>();
  public getMe: InputSignal<GetMeModel | null> = input.required();
  public friendCount: WritableSignal<number> = signal(0);

  constructor(private router: Router) {
    effect(
      () => {
        this.friendCount.update(
          () =>
            this.getMe()?.friendships?.filter(
              (f: FriendRelationModel) =>
                f.status === FriendStatusInvitation.ACCEPTED,
            ).length || 0,
        );
      },
      { allowSignalWrites: true },
    );
  }
  goGroup(id: number) {
    this.router.navigate([`/room/group/${id}`]);
  }
}
