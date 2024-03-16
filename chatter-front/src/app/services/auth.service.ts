import { Injectable } from '@angular/core';
import { environment } from '../../env';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UserModel } from '../models/user.model';
import { RegisterModel } from '../models/register.model';

export interface LoginResponse {
  access_token: string;
}
export interface LoginCredentials {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private router: Router,

    private http: HttpClient,
  ) {}

  isLoggedIn(): boolean {
    console.log(
      'localStorage.getItem(authToken)',
      localStorage.getItem('authToken'),
    );
    return !!localStorage.getItem('authToken');
  }

  login(values: LoginCredentials): Observable<LoginResponse> {
    console.log('values', values);

    return this.http
      .post<LoginResponse>(`${this.apiUrl}/users/auth/login`, values)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  register(values: RegisterModel): Observable<UserModel> {
    return this.http
      .post<UserModel>(`${this.apiUrl}/users/auth/register`, values)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }
}
