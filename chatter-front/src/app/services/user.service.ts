import { Injectable } from '@angular/core';
import { environment } from '../../env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUserList(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiUrl}/users`).pipe(
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  uploadUserPicture(userId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append(`file`, file, file.name);

    const accessToken = localStorage.getItem(`access_token`);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
    const options = { headers: headers };

    return this.http
      .post(`${this.apiUrl}/users/upload-file/${userId}`, formData, options)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }
}
