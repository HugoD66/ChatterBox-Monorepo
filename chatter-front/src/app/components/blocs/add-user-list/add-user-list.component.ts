import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { AddUserListUnitComponent } from './add-user-list-unit/add-user-list-unit.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,

  selector: 'app-add-user-list',
  standalone: true,
  imports: [AddUserListUnitComponent],
  templateUrl: './add-user-list.component.html',
  styleUrl: './add-user-list.component.scss',
})
export class AddUserListComponent {
  public users: InputSignal<UserModel[]> = input.required<UserModel[]>();

  constructor() {}
}
