import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [MatFormField, MatInput, MatIcon, FormsModule, MatLabel],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss',
})
export class SearchbarComponent {
  @Output() searchEvent = new EventEmitter<string>();
  value = ``;

  onSearchChange(searchValue: string): void {
    this.searchEvent.emit(searchValue);
  }

  resetSearch() {
    this.value = ``;
    this.onSearchChange(this.value);
  }
}
