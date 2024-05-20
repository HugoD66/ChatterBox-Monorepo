import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../socket/socket.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent implements OnInit {
  notification: string | undefined;

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.webSocketService
      .listen('receiveNotification')
      .subscribe((data: any) => {
        this.notification = data;
        alert(`New notification: ${this.notification}`);
      });
    /* this.webSocketService
      .listen('receiveNotification')
      .subscribe((data: any) => {
        this.notification = data;
      });*/
  }
}
