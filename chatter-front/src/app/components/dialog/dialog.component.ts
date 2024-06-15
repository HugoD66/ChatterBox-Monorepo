import {
  ChangeDetectionStrategy,
  Component,
  effect,
  Inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { GetMeModel, UserModel } from '../../models/user.model';
import { FriendRelationModel } from '../../models/friend-relation.model';
import { FriendService } from '../../services/friend.service';
import { LoaderComponent } from '../loader/loader.component';
import { AuthService } from '../../services/auth.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, LoaderComponent],
})
export class DialogComponent {
  public getMe: WritableSignal<GetMeModel | null> = signal(null);
  public isLoading: WritableSignal<boolean> = signal(true);
  public friend: WritableSignal<UserModel | null> = signal(null);
  public friendUserRelation: WritableSignal<FriendRelationModel | null> =
    signal(null);

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: UserModel,
    private friendService: FriendService,
    private authService: AuthService,
  ) {
    this.authService.getMe().subscribe((getMe: GetMeModel) => {
      this.getMe.update(() => getMe);
      this.isLoading.set(false);

      console.log('GETME', getMe);
    });
    effect(
      () => {
        if (!this.getMe()) {
          return;
        }
        console.log(this.getMe()!.id, this.user.id);
        this.friendService
          .getFriend(this.getMe()!.id, this.user.id)
          .subscribe((friendRelation) => {
            this.friendUserRelation.set(friendRelation);
            console.log(friendRelation);
          });
      },
      { allowSignalWrites: true },
    );
  }
}
