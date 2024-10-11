import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GetMeModel, UserModel } from '../models/user.model';
import { DialogSettingsFriendComponent } from '../components/dialog/dialog-settings-friend/dialog-settings-friend.component';
import { DialogRemoveFriendComponent } from '../components/dialog/dialog-remove-friend/dialog-remove-friend.component';
import { FriendRelationModel } from '../models/friend-relation.model';
import { DialogTypeEnum } from '../enum/dialog.type.enum';

export class SettingsOrRemoveFriendDialogData {
  constructor(
    public user: UserModel,
    public friendRelation: FriendRelationModel,
  ) {}
}

@Injectable()
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(
    getMe: GetMeModel,
    dataType: SettingsOrRemoveFriendDialogData,
    dialogType: DialogTypeEnum,
  ): void {
    let dialogRef;

    switch (dialogType) {
      case DialogTypeEnum.SETTINGS_FRIEND:
        dialogRef = this.dialog.open(DialogSettingsFriendComponent, {
          data: { getMe, dataType, dialogType },
        });
        break;
      case DialogTypeEnum.REMOVE_FRIEND:
        dialogRef = this.dialog.open(DialogRemoveFriendComponent, {
          data: { getMe, dataType, dialogType },
        });
        break;
      default:
        console.warn(`Dialog type ${dialogType} not supported.`);
        return;
    }

    if (dialogRef) {
      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }
}

/*
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
  ) {
    this.getMe.set(data.getMe);
    this.dialogTypeEnum.set(data.dialogType);
    this.user.set(data.dataType.user);
    this.friendRelation.set(data.dataType.friendRelation);

    this.isLoading.set(false);

    console.log('DialogComponent data:', data);
  }

*/
