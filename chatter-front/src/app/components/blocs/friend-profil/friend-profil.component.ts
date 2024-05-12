import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { MatIcon } from '@angular/material/icon';
import { DialogService } from '../../../services/dialog.service';
import { LoaderComponent } from '../../loader/loader.component';
import { environment } from '../../../../env';
import { FriendRelationModel } from '../../../models/friend-relation.model';
import { DatePipe, NgStyle } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-friend-profil',
  standalone: true,
  imports: [MatIcon, LoaderComponent, DatePipe, NgStyle],
  templateUrl: './friend-profil.component.html',
  styleUrl: './friend-profil.component.scss',
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          height: '26vh',
        }),
      ),
      state(
        'closed',
        style({
          height: '0vh',
        }),
      ),
      transition('closed => open', [animate('3s')]),
      transition('open => closed', [animate('3s')]),
    ]),
  ],
})
export class FriendProfilComponent {
  public getMe: InputSignal<UserModel> = input.required<UserModel>();
  public userSelected: InputSignal<UserModel> = input.required<UserModel>();
  public isFriend: WritableSignal<boolean> = signal(false);
  public isProfilSelected: InputSignal<boolean> = input.required<boolean>();
  public onOpenComponent: WritableSignal<boolean> = signal(true);
  protected apiUrl = environment.apiUrl;

  constructor(public dialogService: DialogService) {
    // Liste de mes amis //
    //const friendShipList: Signal<FriendRelationModel[]> = computed(() =>
    //  this.getMe().friendships!.map((friend) => friend),
    //);

    effect(
      () => {
        // console.log('userSelected');
        console.log(this.userSelected());
        console.log(this.getMe());
        this.getMe().friendships!.forEach((friend: FriendRelationModel) => {
          if (this.userSelected().id === friend.friend.id) {
            //console.log('FRIEND');
            console.log(friend);
            this.isFriend.update(() => true);
          } else {
            //console.log('NOT FRIEND');
            this.isFriend.update(() => false);
          }
        });
      },
      { allowSignalWrites: true },
    );
  }

  public openDialog(user: UserModel): void {
    this.dialogService.openDialog(this.userSelected());
  }

  toggle() {
    this.onOpenComponent.update((value) => !value);
  }
}
