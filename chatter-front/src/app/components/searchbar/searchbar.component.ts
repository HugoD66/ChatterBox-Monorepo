import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatIcon,
    FormsModule,
    MatLabel,
    MatIconButton,
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss',
})
export class SearchbarComponent {
  @Output() searchEvent = new EventEmitter<any>();
  value = ``;

  onSearchChange(searchValue: string): void {
    this.searchEvent.emit(searchValue);
  }

  reset() {
    this.value = ``;
    this.onSearchChange(this.value);
  }
}
