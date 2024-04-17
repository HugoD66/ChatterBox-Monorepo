import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { SearchbarComponent } from '../../searchbar/searchbar.component';
import { LoaderComponent } from '../../loader/loader.component';
import { UserModel } from '../../../models/user.model';
import { AddUserListComponent } from '../add-user-list/add-user-list.component';
import { UserService } from '../../../services/user.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,

  selector: 'app-add-friend-search',
  standalone: true,
  imports: [SearchbarComponent, LoaderComponent, AddUserListComponent],
  templateUrl: './add-friend-search.component.html',
  styleUrl: './add-friend-search.component.scss',
})
export class AddFriendSearchComponent {
  public isLoading: WritableSignal<boolean> = signal(true);
  public userList: WritableSignal<UserModel[]> = signal([]);
  public isFriendsFound: WritableSignal<boolean> = signal(false);
  public getMe: InputSignal<UserModel> = input.required<UserModel>();

  constructor(private userService: UserService) {
    this.userService.getUserList().subscribe((users: UserModel[]) => {
      this.userList.set(users);
      this.isLoading.set(false);
    });
  }

  onSearch($event: string) {
    console.log($event, 'search');
  }
}
