import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { GetMeModel, UserModel } from '../../../models/user.model';
import { FriendRelationModel } from '../../../models/friend-relation.model';
import { MatButton } from '@angular/material/button';
import { SettingsOrRemoveFriendDialogData } from '../../../services/dialog.service';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogTypeEnum } from '../../../enum/dialog.type.enum';
import { FriendService } from '../../../services/friend.service';
import { PopupService } from '../../../services/popup.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dialog-remove-friend',
  standalone: true,
  imports: [MatButton, MatDialogContent],
  templateUrl: './dialog-remove-friend.component.html',
  styleUrl: './../dialog.component.scss',
})
export class DialogRemoveFriendComponent {
  public getMe: WritableSignal<GetMeModel | null> = signal(null);
  public isLoading: WritableSignal<boolean> = signal(true);
  public user: WritableSignal<UserModel | null> = signal(null);
  public friendRelation: WritableSignal<FriendRelationModel | null> =
    signal(null);
  public dialogTypeEnum: WritableSignal<DialogTypeEnum> = signal(
    DialogTypeEnum.SETTINGS_FRIEND,
  );

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      getMe: GetMeModel;
      dataType: SettingsOrRemoveFriendDialogData;
      dialogType: DialogTypeEnum;
    },
    public friendService: FriendService,
    private popupService: PopupService,
    private dialogRef: MatDialogRef<DialogRemoveFriendComponent>,
  ) {
    this.getMe.set(data.getMe);
    this.dialogTypeEnum.set(data.dialogType);
    this.user.set(data.dataType.user);
    this.friendRelation.set(data.dataType.friendRelation);

    this.isLoading.set(false);
  }

  deleteFriend() {
    this.friendService
      .removeFriend(this.getMe()!.id, this.user()!.id)
      .subscribe(() => {
        this.closeDialog();
      });
    this.popupService.openSimpleMessageSnackBar({
      message: 'Amitié finie!',
      color: 'tomato',
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
