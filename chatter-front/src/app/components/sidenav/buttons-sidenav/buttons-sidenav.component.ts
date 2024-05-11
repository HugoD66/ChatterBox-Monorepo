import { Component, input, InputSignal } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-buttons-sidenav',
  standalone: true,
  imports: [NgClass, MatButton],
  templateUrl: './buttons-sidenav.component.html',
  styleUrl: './buttons-sidenav.component.scss',
})
export class ButtonsSidenavComponent {
  public isExpanded: InputSignal<boolean> = input.required<boolean>();

  constructor(private router: Router) {}

  goGroup(id: number) {
    this.router.navigate([`/room/group/${id}`]);
  }
}
