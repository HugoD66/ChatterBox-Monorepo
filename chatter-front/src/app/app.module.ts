import {
  NgModule,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, RouterModule, RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routes } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AnimationMetadataType, AnimationMetadata } from '@angular/animations';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TruncateLongPipe } from './pipe/TruncateLongPipe';
import { DialogService } from './services/dialog.service';
import { MessageService } from './services/message.service';
import { FriendService } from './services/friend.service';
import { UserService } from './services/user.service';
import { PopupService } from './services/popup.service';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { RoomService } from './services/room.service';
import { FormatPluralizePipe } from './pipe/FormatPluralizePipe';

@NgModule({
  imports: [
    CommonModule,
    RouterOutlet,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    TruncateLongPipe,
    SidenavComponent,
    FormatPluralizePipe,
    NoopAnimationsModule,
  ],
  providers: [
    DialogService,
    MessageService,
    FriendService,
    UserService,
    RoomService,
    PopupService,
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideExperimentalZonelessChangeDetection(),
    provideAnimationsAsync(),
  ],
})
export class AppModule {}
