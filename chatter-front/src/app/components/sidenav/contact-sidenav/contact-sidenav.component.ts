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

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-contact-sidenav',
  standalone: true,
  imports: [SectionDetailUnitComponent],
  templateUrl: './contact-sidenav.component.html',
  styleUrl: './contact-sidenav.component.scss',
})
export class ContactSidenavComponent {
  public getMe: InputSignal<UserModel | null> = input.required();
  public friendList: WritableSignal<UserModel[]> = signal([]);
  constructor() {
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
}
