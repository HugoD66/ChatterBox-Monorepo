import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopUpComponent } from '../components/pop-up/pop-up.component';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  durationInSeconds = 1;

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, color: string) {
    this._snackBar.openFromComponent(PopUpComponent, {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      data: { message: message, color: color },
    });
  }
}
