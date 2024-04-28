import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-icons-sidenav',
  standalone: true,
  imports: [],
  templateUrl: './icons-sidenav.component.html',
  styleUrl: './icons-sidenav.component.scss',
})
export class IconsSidenavComponent {}
