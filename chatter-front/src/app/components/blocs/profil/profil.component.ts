import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../../../models/user.model';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss',
})
export class ProfilComponent {
  @Input() getMe!: BehaviorSubject<UserModel | null>;
}
