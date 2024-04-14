import { Component, signal, WritableSignal } from '@angular/core';
import { SearchbarComponent } from '../../searchbar/searchbar.component';
import { LoaderComponent } from '../../loader/loader.component';

@Component({
  selector: 'app-add-friend-search',
  standalone: true,
  imports: [SearchbarComponent, LoaderComponent],
  templateUrl: './add-friend-search.component.html',
  styleUrl: './add-friend-search.component.scss',
})
export class AddFriendSearchComponent {
  public isLoading: WritableSignal<boolean> = signal(true);
  public isFriendsFound: WritableSignal<boolean> = signal(false);

  constructor() {
    this.isLoading.set(false);
  }
  onSearch($event: string) {
    console.log($event, 'search');
  }
}
