import {
  ChangeDetectionStrategy,
  Component,
  effect,
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
import { NgClass } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { RoomService } from '../../../services/room.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,

  selector: 'app-room-sidenav',
  standalone: true,
  imports: [SectionDetailUnitComponent, MatIcon, NgClass, MatButton],
  templateUrl: './room-sidenav.component.html',
  styleUrl: '../sections-contact-room.component.scss',
})
export class RoomSidenavComponent {
  public getMe: InputSignal<GetMeModel | null> = input.required();
  public roomList: WritableSignal<RoomModel[] | null> = signal(null);
  public isExpanded: InputSignal<boolean> = input.required<boolean>();

  constructor(
    private router: Router,
    private roomService: RoomService,
  ) {
    effect(() => {
      this.roomService.getRoomsByUser(this.getMe()!.id).subscribe((rooms) => {
        this.roomList.update(() => rooms);
      });
    });
  }

  goCreateRoom() {
    this.router.navigate(['room/create']);
  }
}
