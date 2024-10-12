import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  inject,
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
import { FriendModel } from '../../../models/friend-relation.model';
import { FriendFormatservice } from '../../../services/friend-format.service';

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
  public searchFriendResult: WritableSignal<FriendModel[]> = signal([]);
  public getMe: InputSignal<GetMeModel> = input.required<GetMeModel>();
  public isUserPanel: WritableSignal<boolean> = signal(true);
  public userProfil: WritableSignal<UserModel | null> = signal(null);

  private friendFormatService = inject(FriendFormatservice);
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
        if (this.getMe().friends) {
          const friends: FriendModel[] = this.friendFormatService.getAllFriends(
            this.getMe().friends,
          );
          this.searchFriendResult.set(friends);
        }
      },
      { allowSignalWrites: true },
    );

    effect(
      () => {
        if (this.isUserPanel() || !this.isUserPanel()) {
          if (this.searchBar) {
            this.searchBar.reset();
          }
          const friends: FriendModel[] = this.friendFormatService.getAllFriends(
            this.getMe().friends,
          );
          this.searchFriendResult.set(friends);
        }
      },
      { allowSignalWrites: true },
    );
  }

  onSearch($event: string) {
    if (!this.isUserPanel()) {
      const searchFriendResult: FriendModel[] =
        this.searchFriendResult()!.filter((friendRelation: FriendModel) =>
          friendRelation.friendRelation.pseudo
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

  public setUserInformation($event: UserModel) {
    this.userProfil.set($event);
    this.onUserclick.emit($event);
  }
}
