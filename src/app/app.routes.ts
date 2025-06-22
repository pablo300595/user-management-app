import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { HomeComponent } from './dashboard/components/home/home.component';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./dashboard/components/home/dashboard-view/dashboard-view.component').then(
            (m) => m.DashboardViewComponent
          ),
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./dashboard/components/home/profile-view/profile-view.component').then(
            (m) => m.ProfileViewComponent
          ),
      },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
