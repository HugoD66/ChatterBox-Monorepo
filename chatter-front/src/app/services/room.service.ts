import { Injectable } from '@angular/core';
import { environment } from '../../env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageModel } from '../models/message.model';
import { RoomModel } from '../models/room.model';

export interface PrivateRoomSearch {
  userId: string;
  participantId: string;
}

@Injectable()
export class RoomService {
  private apiUrl = environment.apiUrl;
  protected accessToken = localStorage.getItem(`authToken`);

  constructor(private http: HttpClient) {}

  getRoom(roomId: string): Observable<RoomModel> {
    return this.http
      .get<RoomModel>(`${this.apiUrl}/room/${roomId}`, {
        headers: new HttpHeaders().set(
          'Authorization',
          'Bearer ' + this.accessToken,
        ),
      })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  getRoomsByUser(userId: string): Observable<RoomModel[]> {
    return this.http
      .get<RoomModel[]>(`${this.apiUrl}/room/group/${userId}`, {
        headers: new HttpHeaders().set(
          'Authorization',
          'Bearer ' + this.accessToken,
        ),
      })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  getRoomByUser(search: PrivateRoomSearch): Observable<RoomModel> {
    return this.http
      .get<RoomModel>(`${this.apiUrl}/room/by-user/${search.participantId}`, {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${this.accessToken}`,
        ),
      })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  getRoomyUser(userId: string): Observable<RoomModel> {
    return this.http
      .get<RoomModel>(`${this.apiUrl}/room/by-user/${userId}`, {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${this.accessToken}`,
        ),
      })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  getUnreadsMessagesByUser(userId: string): Observable<MessageModel[]> {
    return this.http
      .get<MessageModel[]>(`${this.apiUrl}/room/unreads-messages/${userId}`, {
        headers: new HttpHeaders().set(
          'Authorization',
          'Bearer ' + this.accessToken,
        ),
      })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }
}
