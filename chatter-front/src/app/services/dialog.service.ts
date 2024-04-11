import { Injectable } from '@angular/core';
import { DialogComponent } from '../components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserModel } from '../models/user.model';

@Injectable()
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(user: UserModel) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: user,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
