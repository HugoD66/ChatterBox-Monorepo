import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/security/login/login.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './pages/security/guard/auth.guard';
import { RegisterComponent } from './pages/security/register/register.component';
import { AuthComponent } from './pages/security/auth/auth.component';
import { LayoutComponent } from './pages/layout/layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      //{ path: 'register', component: RegisterComponent },
    ],
  },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
