import { Injectable } from '@angular/core';
import { environment } from '../../env';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

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
          console.error('Erreur lors de la connexion', error);
          return throwError(() => error);
        }),
      );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
