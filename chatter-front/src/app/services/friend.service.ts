import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../env';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class FriendService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getFriends(userId: string): Observable<any> {
    const accessToken = localStorage.getItem(`authToken`);
    return this.http
      .get(`${this.apiUrl}/friend-users/friends/${userId}`, {
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

  sendFriendRequest(userId: string, friendId: string): Observable<any> {
    const accessToken = localStorage.getItem(`authToken`);
    return this.http
      .post(
        `${this.apiUrl}/friend-users/send-invitation`,
        { userId, friendId },
        {
          headers: new HttpHeaders().set(
            'Authorization',
            'Bearer ' + accessToken,
          ),
        },
      )
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }
}
