import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,

  selector: 'app-add-friend-profil',
  standalone: true,
  imports: [],
  templateUrl: './add-friend-profil.component.html',
  styleUrl: './add-friend-profil.component.scss',
})
export class AddFriendProfilComponent {}
