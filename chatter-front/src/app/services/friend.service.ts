import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../env';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { FriendRelationModel } from '../models/friend-relation.model';

@Injectable()
export class FriendService {
  private apiUrl = environment.apiUrl;
  public userListRefreshNeeded: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) {}

  getFriend(userId: string, friendId: string): Observable<FriendRelationModel> {
    const accessToken = localStorage.getItem(`authToken`);
    return this.http
      .get<FriendRelationModel>(
        `${this.apiUrl}/friend-users/${userId}/${friendId}`,
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

  public getPendingUser(userId: string): Observable<FriendRelationModel[]> {
    const accessToken = localStorage.getItem(`authToken`);
    return this.http
      .get<FriendRelationModel[]>(
        `${this.apiUrl}/friend-users/pending-user/${userId}`,
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

  /*
  *
  /*
  *   async getFriends(
    userId: string,
  ): Promise<Observable<FriendRelationModel | Error>> {
    const accessToken = localStorage.getItem('authToken');
    return this.http
      .get<FriendRelationModel>(
        `${this.apiUrl}/friend-users/friends/${userId}`,
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
*/

  getAcceptedFriends(userId: string): Observable<any> {
    const accessToken = localStorage.getItem(`authToken`);
    return this.http
      .get(`${this.apiUrl}/friend-users/friends/accepted/${userId}`, {
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

  removeFriend(userId: string, friendId: string): Observable<any> {
    const accessToken = localStorage.getItem('authToken');
    return this.http
      .post(
        `${this.apiUrl}/friend-users/delete-friend`,
        { userId, friendId },
        {
          headers: new HttpHeaders().set(
            'Authorization',
            'Bearer ' + accessToken,
          ),
        },
      )
      .pipe(
        tap(() => {
          this.userListRefreshNeeded.next();
        }),
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

  acceptFriendRequest(friendRelationId: string) {
    const accessToken = localStorage.getItem(`authToken`);

    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + accessToken,
    );
    return this.http
      .patch(
        `${this.apiUrl}/friend-users/accept-invitation/${friendRelationId}`,
        headers,
        {
          headers: new HttpHeaders().set(
            'Authorization',
            'Bearer ' + accessToken,
          ),
        },
      )
      .pipe(
        tap(() => {
          this.userListRefreshNeeded.next();
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }
}
