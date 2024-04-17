import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';

import { UserModel } from '../../../models/user.model';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { LoaderComponent } from '../../loader/loader.component';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { UserService } from '../../../services/user.service';
import { environment } from '../../../../env';
import { AuthService } from '../../../services/auth.service';
import { switchMap, tap } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-profil',
  standalone: true,
  imports: [
    MatButton,
    MatDivider,
    LoaderComponent,
    DatePipe,
    MatIcon,
    NgOptimizedImage,
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss',
})
export class ProfilComponent implements OnInit {
  public getMe: InputSignal<UserModel | null> =
    input.required<UserModel | null>();
  public getMeAvatar: WritableSignal<string> = signal('');
  protected apiUrl = environment.apiUrl;
  public isLoading: WritableSignal<boolean> = signal(true);
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getPicture().subscribe((picture) => {
      const pictureUrl = `${this.apiUrl}/./${picture}`;
      this.getMeAvatar.update(() => `${pictureUrl}`);
      this.isLoading.update(() => false);
    });
  }

  protected onFileSelect(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    if (element.files) {
      const file = element.files[0];
      this.userService
        .uploadUserPicture(this.getMe()!.id, file)
        .subscribe(() => {
          this.userService.getPicture().subscribe((picture) => {
            const pictureUrl = `${this.apiUrl}/./${picture}`;
            this.getMeAvatar.update(() => `${pictureUrl}`);
          });
        });
    }
  }
}
