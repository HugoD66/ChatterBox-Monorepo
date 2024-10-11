import {
  ChangeDetectionStrategy,
  Component,
  effect,
  signal,
  WritableSignal,
} from '@angular/core';
import { AddFriendSearchComponent } from '../../components/blocs/add-friend-search/add-friend-search.component';
import { FriendProfilComponent } from '../../components/blocs/friend-profil/friend-profil.component';
import { GetMeModel, UserModel } from '../../models/user.model';
import { LoaderComponent } from '../../components/loader/loader.component';
import { NgClass, NgStyle } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { switchMap } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-add-friend',
  standalone: true,
  imports: [
    AddFriendSearchComponent,
    FriendProfilComponent,
    LoaderComponent,
    NgStyle,
    NgClass,
  ],
  templateUrl: './add-friend.component.html',
  styleUrl: './add-friend.component.scss',
})
export class AddFriendComponent {
  public getMe: WritableSignal<GetMeModel | null> = signal(null);
  public isLoading: WritableSignal<boolean> = signal(true);
  public profilSelected: WritableSignal<UserModel | null> = signal(null);

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {
    this.authService.getMe().subscribe((getMe: GetMeModel) => {
      this.getMe.update(() => getMe);
      this.isLoading.set(false);
    });

    effect(
      () => {
        this.isUserIsShared();
      },
      { allowSignalWrites: true },
    );

    /*effect(() => {
      if(userShared())
    });*/
  }

  onUserclick($event: UserModel) {
    this.profilSelected.set($event);
  }

  refreshGetMeEvent() {
    this.authService.getMe().subscribe((getMe: GetMeModel) => {
      this.getMe.update(() => getMe);
      this.isLoading.set(false);
    });
  }

  private isUserIsShared(): any {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const userId = params.get('id');

          if (userId) {
            return this.userService.getUserById(userId);
          }

          return [];
        }),
      )
      .subscribe((user: UserModel) => {
        console.log('OCUCOU');

        if (user) {
          this.profilSelected.set(user);
        }
      });
  }
}
