import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  input,
  effect,
} from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { RoomModel } from '../../../models/room.model';
import { environment } from '../../../../env';
import { MatSidenav } from '@angular/material/sidenav';
import { NgClass } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-section-detail-unit',
  standalone: true,
  imports: [MatSidenav, NgClass],
  templateUrl: './section-detail-unit.component.html',
  styleUrl: './section-detail-unit.component.scss',
})
export class SectionDetailUnitComponent {
  public detailUnit: InputSignal<UserModel | RoomModel | undefined> = input();
  public detailUser: InputSignal<UserModel | undefined> = input();
  public isExpanded: InputSignal<boolean> = input.required<boolean>();

  protected apiUrl = environment.apiUrl;

  constructor() {
    effect(
      () => {
        console.log(this.detailUnit());
      },
      { allowSignalWrites: true },
    );
  }
}
