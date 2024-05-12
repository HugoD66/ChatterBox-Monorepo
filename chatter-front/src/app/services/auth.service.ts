import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../env';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { GetMeModel, UserModel } from '../models/user.model';
import { RegisterModel } from '../models/register.model';
import { ChangePasswordModel } from '../models/change-password.model';

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
  public getMeByAuthService: WritableSignal<GetMeModel | null> = signal(null);

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  login(values: LoginCredentials): Observable<LoginResponse> {
    return this.http
      .post<GetMeModel>(`${this.apiUrl}/users/auth/login`, values)
      .pipe(
        tap((response) => {
          localStorage.setItem('authToken', response.access_token);
          const auth = localStorage.getItem('authToken');

          const getMeModel = {
            ...response,
            auth,
          };

          this.getMeByAuthService.update(() => getMeModel as GetMeModel);
          localStorage.setItem(
            'currentUser',
            JSON.stringify(this.getMeByAuthService()),
          );
        }),

        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.getMeByAuthService.update(() => null);
    this.router.navigate(['/auth/login']);
  }

  register(values: RegisterModel): Observable<UserModel> {
    return this.http
      .post<UserModel>(`${this.apiUrl}/users/auth/register`, values)
      .pipe(
        catchError((error) => {
          const errorMessage =
            error.error.message || 'Une erreur inattendue est survenue';
          return throwError(() => new Error(errorMessage));
        }),
      );
  }

  changePassword(changePasswordModel: ChangePasswordModel): Observable<string> {
    const accessToken = localStorage.getItem(`authToken`);
    return this.http
      .patch<string>(
        `${this.apiUrl}/users/auth/password-change`,
        changePasswordModel,
        {
          headers: new HttpHeaders().set(
            'Authorization',
            'Bearer ' + accessToken,
          ),
        },
      )
      .pipe(
        tap((response) => {
          console.warn(response);
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  getMe(): Observable<GetMeModel> {
    const accessToken = localStorage.getItem(`authToken`);
    return this.http
      .get<GetMeModel>(`${this.apiUrl}/users/auth/me`, {
        headers: new HttpHeaders().set(
          'Authorization',
          'Bearer ' + accessToken,
        ),
      })
      .pipe(
        tap((response) => {
          const getMeModel = {
            ...response,
            accessToken,
          };

          this.getMeByAuthService.update(() => getMeModel as GetMeModel);
          localStorage.setItem(
            'currentUser',
            JSON.stringify(this.getMeByAuthService()),
          );
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }
}
