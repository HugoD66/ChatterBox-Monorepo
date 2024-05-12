import { Injectable } from '@angular/core';
import { environment } from '../../env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageModel } from '../models/message.model';

@Injectable()
export class RoomService {
  private apiUrl = environment.apiUrl;
  protected accessToken = localStorage.getItem(`authToken`);

  constructor(private http: HttpClient) {}

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
