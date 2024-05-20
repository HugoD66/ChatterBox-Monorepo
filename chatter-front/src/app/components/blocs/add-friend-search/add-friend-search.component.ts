import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  input,
  InputSignal,
  Output,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { SearchbarComponent } from '../../searchbar/searchbar.component';
import { LoaderComponent } from '../../loader/loader.component';
import { GetMeModel, UserModel } from '../../../models/user.model';
import { AddUserListComponent } from '../add-user-list/add-user-list.component';
import { UserService } from '../../../services/user.service';
import { FriendRelationModel } from '../../../models/friend-relation.model';

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
  public searchUserResult: WritableSignal<UserModel[]> = signal([]);
  public searchFriendResult: WritableSignal<FriendRelationModel[]> = signal([]);
  public getMe: InputSignal<GetMeModel> = input.required<GetMeModel>();
  public isUserPanel: WritableSignal<boolean> = signal(false);
  public userProfil: WritableSignal<UserModel | null> = signal(null);

  @Output() public onUserclick: EventEmitter<UserModel> =
    new EventEmitter<UserModel>();

  @ViewChild('searchBar') searchBar!: SearchbarComponent;

  constructor(private userService: UserService) {
    this.userService.getUserList().subscribe((users: UserModel[]) => {
      const filteredUsers = users.filter((user) => user.id !== this.getMe().id);

      this.userList.set(filteredUsers);
      this.searchUserResult.set(filteredUsers);
      this.isLoading.set(false);
    });

    effect(
      () => {
        if (this.getMe().friendships) {
          this.searchFriendResult.update(() => this.getMe().friendships!);
        }
      },
      { allowSignalWrites: true },
    );
  }

  onSearch($event: string) {
    if (!this.isUserPanel()) {
      const searchFriendResult: FriendRelationModel[] =
        this.searchFriendResult()!.filter(
          (friendRelation: FriendRelationModel) =>
            friendRelation.friend.pseudo
              .toLowerCase()
              .includes($event.toLowerCase()),
        );
      this.searchFriendResult.set(searchFriendResult);
    } else {
      const searchUserResult: UserModel[] = this.userList().filter(
        (user: UserModel) =>
          user.pseudo.toLowerCase().includes($event.toLowerCase()),
      );
      this.searchUserResult.set(searchUserResult);
    }
  }

  public async changePanel() {
    this.isUserPanel.set(!this.isUserPanel());
    this.searchBar.reset();
  }

  setUserInformation($event: UserModel) {
    this.userProfil.set($event);
    this.onUserclick.emit($event);
  }
}
