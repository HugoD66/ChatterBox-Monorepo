import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
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
import { FriendFormatservice } from '../../../services/friend-format.service';

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

  private friendFormatService = inject(FriendFormatservice);
  constructor(private router: Router) {
    effect(
      () => {
        if (!this.getMe()) {
          return;
        }
        this.friendCount.update(() =>
          this.friendFormatService.countFriends(this.getMe()!.friends),
        );
      },
      { allowSignalWrites: true },
    );
  }
  goGroup(id: number) {
    this.router.navigate([`/room/group/${id}`]);
  }
}
