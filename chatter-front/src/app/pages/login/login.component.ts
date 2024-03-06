import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public pictureBackWeb: string =
    '../assets/pictures/background/back-login-web.jpg';
}

/* Changement de thème

import {ThemeService} from "../../services/theme.service";

constructor(
  public themeService: ThemeService
) {}

toggleTheme(): void {
  this.themeService.toggleTheme();
}
*/
