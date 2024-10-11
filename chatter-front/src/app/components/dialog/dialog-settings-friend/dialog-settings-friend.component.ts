import {
  Component,
  Inject,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { GetMeModel, UserModel } from '../../../models/user.model';
import { FriendRelationModel } from '../../../models/friend-relation.model';
import { DialogTypeEnum } from '../../../enum/dialog.type.enum';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { SettingsOrRemoveFriendDialogData } from '../../../services/dialog.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-dialog-settings-friend',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButton],
  templateUrl: './dialog-settings-friend.component.html',
  styleUrl: './../dialog.component.scss',
})
export class DialogSettingsFriendComponent {
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
    private dialogRef: MatDialogRef<DialogSettingsFriendComponent>,
  ) {
    this.getMe.set(data.getMe);
    this.dialogTypeEnum.set(data.dialogType);
    this.user.set(data.dataType.user);
    this.friendRelation.set(data.dataType.friendRelation);

    this.isLoading.set(false);

    console.log('DialogComponent data:', data);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
