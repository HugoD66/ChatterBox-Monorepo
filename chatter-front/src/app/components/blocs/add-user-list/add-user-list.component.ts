import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  input,
  InputSignal,
  Output,
} from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { environment } from '../../../../env';
import { DatePipe } from '@angular/common';
import { FriendModel } from '../../../models/friend-relation.model';
import { FriendStatusInvitation } from '../../../models/enums/friend-status-invitation.enum';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-add-user-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './add-user-list.component.html',
  styleUrl: './add-user-list.component.scss',
})
export class AddUserListComponent {
  @Output() public onUserclick: EventEmitter<UserModel> =
    new EventEmitter<UserModel>();
  protected apiUrl = environment.apiUrl;
  public userClicked: InputSignal<UserModel | undefined> = input<
    UserModel | undefined
  >();
  public friendClicked: InputSignal<FriendModel | undefined> = input<
    FriendModel | undefined
  >();
  public isUserPanel: InputSignal<boolean> = input.required<boolean>();

  protected readonly FriendStatusInvitation = FriendStatusInvitation;

  constructor() {
    effect(() => {
      //console.log(this.user());
    });
  }
}
