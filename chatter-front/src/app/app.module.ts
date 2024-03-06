import {AppComponent} from "./app.component";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    BrowserModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
