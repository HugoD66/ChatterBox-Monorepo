import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { GetMeModel, UserModel } from '../../models/user.model';
import { FriendRelationModel } from '../../models/friend-relation.model';
import { LoaderComponent } from '../loader/loader.component';

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
  public user: WritableSignal<UserModel | null> = signal(null);
  public friendRelation: WritableSignal<FriendRelationModel | null> =
    signal(null);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { user: UserModel; friendRelation?: FriendRelationModel },
  ) {
    this.user.set(data.user);
    if (data.friendRelation) {
      this.friendRelation.set(data.friendRelation);
    }
    this.isLoading.set(false);
  }
}
