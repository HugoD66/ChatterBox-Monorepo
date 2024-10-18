import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  InputSignal,
  Output,
  Renderer2,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { GetMeModel, UserModel } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-icons-sidenav',
  standalone: true,
  imports: [MatIcon, NgClass],
  templateUrl: './icons-sidenav.component.html',
  styleUrl: './icons-sidenav.component.scss',
})
export class IconsSidenavComponent {
  public getMe: InputSignal<GetMeModel | null> = input.required();
  public isExpanded: InputSignal<boolean> = input.required<boolean>();
  public isLightMode: WritableSignal<boolean> = signal(true);
  @Output() changeSidenavMode: EventEmitter<void> = new EventEmitter<void>();
  @Output() removeGetMe = new EventEmitter<UserModel>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2,
  ) {}

  logout(): void {
    this.authService.logout();
    this.removeGetMe.emit();
    this.router.navigate(['/auth/login']);
  }
}
