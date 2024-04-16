import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../env';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { UserModel } from '../models/user.model';
import { RegisterModel } from '../models/register.model';
import { UserGeneralRoleEnum } from '../enum/user.general.role.enum';

export interface LoginResponse {
  access_token: string;
}
export interface LoginCredentials {
  email: string;
  password: string;
}
export interface LoginReturnUser {
  id: string;
  pseudo: string;
  email: string;
  picture: string;
  createdAt: Date;
  roleGeneral: UserGeneralRoleEnum;
  friends: UserModel[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  public getMeByAuthService: WritableSignal<UserModel | null> = signal(null);

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  login(values: LoginCredentials): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/users/auth/login`, values)
      .pipe(
        tap((response) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { access_token, ...userDetails } = response;
          this.getMeByAuthService.update(() => userDetails as LoginReturnUser);
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  logout(): void {
    localStorage.removeItem('authToken');
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

  getMe(): Observable<UserModel> {
    const accessToken = localStorage.getItem(`authToken`);

    return this.http
      .get<UserModel>(`${this.apiUrl}/users/auth/me`, {
        headers: new HttpHeaders().set(
          'Authorization',
          'Bearer ' + accessToken,
        ),
      })
      .pipe(
        tap((response) => {
          this.getMeByAuthService.update(() => response as LoginReturnUser);
          console.log(this.getMeByAuthService());
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }
}
