import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TruncateLongPipe } from './pipe/TruncateLongPipe';
import { DialogService } from './services/dialog.service';
import { MessageService } from './services/message.service';
@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    RouterOutlet,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SidenavComponent,
    TruncateLongPipe,
  ],
  providers: [provideAnimationsAsync(), DialogService, MessageService],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
