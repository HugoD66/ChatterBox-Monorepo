import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../env';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class FriendService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getFriends(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/friends/${userId}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }
}
