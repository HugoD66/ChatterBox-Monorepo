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

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-section-detail-unit',
  standalone: true,
  imports: [],
  templateUrl: './section-detail-unit.component.html',
  styleUrl: './section-detail-unit.component.scss',
})
export class SectionDetailUnitComponent {
  public detailUnit: InputSignal<UserModel | RoomModel | undefined> = input();
  public detailUser: InputSignal<UserModel | undefined> = input();
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
