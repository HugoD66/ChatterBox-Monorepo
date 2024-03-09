import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/security/login/login.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: ``, component: LoginComponent },
  { path: `login`, component: LoginComponent },
  { path: `home`, component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
