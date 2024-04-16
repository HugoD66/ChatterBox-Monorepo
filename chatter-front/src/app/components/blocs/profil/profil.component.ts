import { Component, input, InputSignal, OnInit } from '@angular/core';

import { UserModel } from '../../../models/user.model';
import { MatButton } from '@angular/material/button';
import * as jdenticon from 'jdenticon';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [MatButton, MatDivider],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss',
})
export class ProfilComponent implements OnInit {
  //TODO TEST CREATION IMAGE, A BOUGER DE PLACE
  iconSvg: SafeHtml | undefined;
  public getMe: InputSignal<UserModel | null> =
    input.required<UserModel | null>();
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    console.log(this.getMe());
    //TODO TEST CREATION IMAGE, A BOUGER DE PLACE
    const value = 'user@example.com';
    const size = 200;
    this.iconSvg = this.sanitizer.bypassSecurityTrustHtml(
      jdenticon.toSvg(value, size),
    );
  }
}
