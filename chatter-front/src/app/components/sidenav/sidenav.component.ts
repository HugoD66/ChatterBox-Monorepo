import { Component } from '@angular/core';
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [NgClass, MatSidenavModule, MatDrawer, MatDrawerContainer],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  showFiller: boolean = false;
}
