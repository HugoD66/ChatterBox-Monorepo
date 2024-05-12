import { Injectable } from '@angular/core';
import { environment } from '../../env';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageModel } from '../models/message.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MessageService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMessages(): Observable<MessageModel[]> {
    return this.http.get<MessageModel[]>(`${this.apiUrl}/message`).pipe(
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  getDiscussion(
    receiverId: string,
    userId: string,
  ): Observable<MessageModel[]> {
    return this.http
      .get<
        MessageModel[]
      >(`${this.apiUrl}/message/discussion/${receiverId}/${userId}`)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }
  //TODO DELETE
  getUnreadMessages(userId: string): Observable<MessageModel[]> {
    return this.http
      .get<MessageModel[]>(`${this.apiUrl}/message/unread/${userId}`)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }
}
