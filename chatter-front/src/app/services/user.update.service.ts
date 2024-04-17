import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UserUpdateService {
  public updateFormPseudo = new FormGroup({
    pseudo: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  updateFormEmail = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur',
    }),
  });

  updateFormPassword = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
}
