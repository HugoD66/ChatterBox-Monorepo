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

  getUnreadMessages(): Observable<MessageModel[]> {
    return this.http
      .get<MessageModel[]>(`${this.apiUrl}/message/unread/temp`)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }
}
