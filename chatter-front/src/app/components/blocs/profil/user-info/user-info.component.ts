import {
  Component,
  EventEmitter,
  input,
  InputSignal,
  Output,
} from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [MatButton],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent {
  public title: InputSignal<string> = input.required<string>();
  public value: InputSignal<string> = input.required<string>();
  @Output() updateView: EventEmitter<void> = new EventEmitter<void>();
}
