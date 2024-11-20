import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GetMeModel, UserModel } from '../models/user.model';
import { DialogSettingsFriendComponent } from '../components/dialog/dialog-settings-friend/dialog-settings-friend.component';
import { DialogRemoveFriendComponent } from '../components/dialog/dialog-remove-friend/dialog-remove-friend.component';
import { FriendRelationModel } from '../models/friend-relation.model';
import { DialogTypeEnum } from '../enum/dialog.type.enum';
import { DialogThemeComponent } from '../components/dialog/dialog-theme/dialog-theme.component';

export class SettingsOrRemoveFriendDialogData {
  constructor(
    public user: UserModel,
    public friendRelation: FriendRelationModel,
  ) {}
}
export class Theme {
  constructor(public theme: string) {}
}

@Injectable()
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(
    getMe: GetMeModel,
    dataType: SettingsOrRemoveFriendDialogData | Theme,
    dialogType: DialogTypeEnum,
  ): void {
    let dialogRef;

    switch (dialogType) {
      case DialogTypeEnum.THEME:
        dialogRef = this.dialog.open(DialogThemeComponent, {
          data: { getMe, dataType, dialogType },
        });
        break;
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
