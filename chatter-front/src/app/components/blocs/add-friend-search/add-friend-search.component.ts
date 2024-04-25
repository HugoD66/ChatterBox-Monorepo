import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  input,
  InputSignal,
  Output,
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
  public searchResult: WritableSignal<UserModel[]> = signal([]);
  public getMe: InputSignal<UserModel> = input.required<UserModel>();
  public isPanelFriend: WritableSignal<boolean> = signal(true);
  public userProfil: WritableSignal<UserModel | null> = signal(null);

  @Output() public onUserclick: EventEmitter<UserModel> =
    new EventEmitter<UserModel>();

  constructor(private userService: UserService) {
    this.userService.getUserList().subscribe((users: UserModel[]) => {
      this.userList.set(users);
      this.searchResult.set(users);
      this.isLoading.set(false);
    });
  }

  onSearch($event: string) {
    const searchResult: UserModel[] = this.userList().filter(
      (user: UserModel) =>
        user.pseudo.toLowerCase().includes($event.toLowerCase()),
    );
    this.searchResult.set(searchResult);
  }

  public async changePanel() {
    this.isPanelFriend.set(!this.isPanelFriend());
  }

  setUserInformation($event: UserModel) {
    this.userProfil.set($event);
    this.onUserclick.emit($event);
  }
}
