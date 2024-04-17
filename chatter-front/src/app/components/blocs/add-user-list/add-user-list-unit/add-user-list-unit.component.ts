import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { UserModel } from '../../../../models/user.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,

  selector: 'app-add-user-list-unit',
  standalone: true,
  imports: [],
  templateUrl: './add-user-list-unit.component.html',
  styleUrl: './add-user-list-unit.component.scss',
})
export class AddUserListUnitComponent {
  public user: InputSignal<UserModel> = input.required<UserModel>();
}
