import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { DialogService } from './app/services/dialog.service';
import { MessageService } from './app/services/message.service';
import { FriendService } from './app/services/friend.service';
import { UserService } from './app/services/user.service';
import { RoomService } from './app/services/room.service';
import { PopupService } from './app/services/popup.service';

/*platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
  */

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideExperimentalZonelessChangeDetection(),
    DialogService,
    MessageService,
    FriendService,
    UserService,
    RoomService,
    PopupService,
  ],
}).catch((err) => console.error(err));
