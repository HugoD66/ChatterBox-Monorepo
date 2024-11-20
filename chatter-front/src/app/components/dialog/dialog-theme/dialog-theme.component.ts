import {
  Component,
  Inject,
  OnDestroy,
  signal,
  WritableSignal,
} from '@angular/core';
import { GetMeModel } from '../../../models/user.model';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { Theme } from '../../../services/dialog.service';
import { DialogTypeEnum } from '../../../enum/dialog.type.enum';
import { ThemeEnum } from '../../../enum/theme.enum';
import { ThemeService } from '../../../services/theme.service';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
/*
 * COUCOUCOUCUC
 *
 *
 *
 * */
@Component({
  selector: 'app-dialog-theme',
  standalone: true,
  imports: [MatDialogContent, MatIcon, MatDivider],
  templateUrl: './dialog-theme.component.html',
  styleUrl: './../dialog.component.scss',
})
export class DialogThemeComponent implements OnDestroy {
  public getMe: WritableSignal<GetMeModel | null> = signal(null);
  public isLoading: WritableSignal<boolean> = signal(true);

  protected readonly ThemeEnum = ThemeEnum;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      getMe: GetMeModel;
      dataType: Theme;
      dialogType: DialogTypeEnum;
    },
    public themeService: ThemeService,
    private dialogRef: MatDialogRef<DialogThemeComponent>,
  ) {
    this.getMe.set(data.getMe);

    this.isLoading.set(false);
  }

  ngOnDestroy() {
    this.closeDialog();
  }

  private closeDialog() {
    this.dialogRef.close();
  }

  public changeTheme(theme: ThemeEnum) {
    this.themeService.changeTheme(theme);
  }

  public changeThemeMode() {
    this.themeService.changeThemeMode();
  }
}
