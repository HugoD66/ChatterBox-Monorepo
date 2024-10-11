import { Injectable } from '@angular/core';
import { environment } from '../../env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, pipe, tap, throwError } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUserList(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiUrl}/users`).pipe(
      tap((response) => {}),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  getUserById(userId: string): Observable<UserModel> {
    const accessToken = localStorage.getItem(`authToken`);
    return this.http
      .get<UserModel>(`${this.apiUrl}/users/${userId}`, {
        headers: new HttpHeaders().set(
          'Authorization',
          'Bearer ' + accessToken,
        ),
      })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  uploadUserPicture(userId: string, file: File) {
    const formData = new FormData();
    formData.append(`file`, file, file.name);
    const accessToken = localStorage.getItem(`authToken`);
    return this.http
      .post(`${this.apiUrl}/users/upload-file/${userId}`, formData, {
        headers: new HttpHeaders().set(
          'Authorization',
          'Bearer ' + accessToken,
        ),
      })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  getPicture(): Observable<any> {
    const accessToken = localStorage.getItem(`authToken`);
    return this.http.get(`${this.apiUrl}/users/get-picture`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + accessToken),
      responseType: 'text' as 'json',
    });
  }

  updateUser(userId: string, user: any): Observable<UserModel> {
    const accessToken = localStorage.getItem(`authToken`);
    return this.http.put<UserModel>(`${this.apiUrl}/users/${userId}`, user, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + accessToken),
    });
  }
}
