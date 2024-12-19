import { Injectable } from '@angular/core';
import { environment } from '../../env';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageModel } from '../models/message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MessageService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public async sendMessage(message: MessageModel): Promise<any> {
    const accessToken = localStorage.getItem(`authToken`);

    return this.http
      .post(`${this.apiUrl}/message`,
        message,
        {
        headers: new HttpHeaders().set(
          'Authorization',
          'Bearer ' + accessToken,
        ),
      })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        }),
      ).toPromise();
  }

  getMessages(): Observable<MessageModel[]> {
    return this.http.get<MessageModel[]>(`${this.apiUrl}/message`).pipe(
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  getDiscussion(
    roomId: string,
  ): Observable<MessageModel[]> {
    return this.http
      .get<
        MessageModel[]
      >(`${this.apiUrl}/message/discussion/${roomId}`)
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
