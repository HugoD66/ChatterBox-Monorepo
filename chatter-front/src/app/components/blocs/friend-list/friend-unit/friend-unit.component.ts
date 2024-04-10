import { Component, input, InputSignal } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-friend-unit',
  standalone: true,
  imports: [MatDivider, MatIcon],
  templateUrl: './friend-unit.component.html',
  styleUrl: './friend-unit.component.scss',
})
export class FriendUnitComponent {
  public friend: InputSignal<string> = input.required<string>();
}
