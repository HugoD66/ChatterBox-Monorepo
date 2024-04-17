import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  InputSignal,
  OnInit,
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
export class AddFriendSearchComponent implements OnInit, AfterViewInit {
  public isLoading: WritableSignal<boolean> = signal(true);
  public userList: WritableSignal<UserModel[]> = signal([]);
  public isFriendsFound: WritableSignal<boolean> = signal(false);
  public getMe: InputSignal<UserModel> = input.required<UserModel>();

  constructor(private userService: UserService) {
    this.isLoading.set(false);
    this.userService.getUserList().subscribe((users: UserModel[]) => {
      this.userList.set(users);
      console.log(this.userList());
      console.log(this.userList());
      console.log(this.userList());
      console.log(this.userList());
      console.log(this.userList());
      console.log(this.userList());

      this.isLoading.set(false);
    });
  }

  ngAfterViewInit() {
    console.log(this.getMe());
    console.log(this.getMe());
    console.log(this.getMe());
    console.log(this.getMe());
    console.log(this.getMe());
  }
  ngOnInit() {
    computed(() => {
      console.log(this.getMe());
      console.log(this.getMe());
      console.log(this.getMe());
      console.log(this.getMe());
      console.log(this.getMe());
      console.log(this.getMe());
      console.log(this.getMe());
    });
    console.log(this.getMe());
    console.log(this.getMe());
    console.log(this.getMe());
    console.log(this.getMe());
    console.log(this.getMe());
  }

  onSearch($event: string) {
    console.log($event, 'search');
  }
}
