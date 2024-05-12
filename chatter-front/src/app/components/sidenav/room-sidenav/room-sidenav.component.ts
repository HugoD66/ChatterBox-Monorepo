import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { SectionDetailUnitComponent } from '../section-detail-unit/section-detail-unit.component';
import { RoomModel } from '../../../models/room.model';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { GetMeModel } from '../../../models/user.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,

  selector: 'app-room-sidenav',
  standalone: true,
  imports: [SectionDetailUnitComponent, MatIcon],
  templateUrl: './room-sidenav.component.html',
  styleUrl: './room-sidenav.component.scss',
})
export class RoomSidenavComponent {
  public getMe: InputSignal<GetMeModel | null> = input.required();
  public roomList: WritableSignal<RoomModel[]> = signal([]);
  public isExpanded: InputSignal<boolean> = input.required<boolean>();

  constructor(private router: Router) {}

  goCreateRoom() {
    this.router.navigate(['room/create']);
  }
}
