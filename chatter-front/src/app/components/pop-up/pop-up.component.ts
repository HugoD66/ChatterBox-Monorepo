import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PopupService } from '../../services/popup.service';
import { NgIf, NgStyle } from '@angular/common';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [
    NgStyle,
    NgIf,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatButton,
    MatSnackBarAction,
    MatIcon,
  ],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss',
})
export class PopUpComponent {
  public message!: string;
  public color!: string;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { message: string; color: string },
    public snackBarRef: MatSnackBarRef<PopUpComponent>,
  ) {
    if (this.data) {
      this.message = this.data.message;
      this.color = this.data.color;
    }
  }
}
