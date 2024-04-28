import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { SectionDetailUnitComponent } from '../section-detail-unit/section-detail-unit.component';
import { UserModel } from '../../../models/user.model';
import { RoomModel } from '../../../models/room.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,

  selector: 'app-room-sidenav',
  standalone: true,
  imports: [SectionDetailUnitComponent],
  templateUrl: './room-sidenav.component.html',
  styleUrl: './room-sidenav.component.scss',
})
export class RoomSidenavComponent {
  public getMe: InputSignal<UserModel | null> = input.required();
  public roomList: WritableSignal<RoomModel[]> = signal([]);
}
