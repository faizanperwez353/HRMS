import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'admin',
        data: { role: 'ROLE_ADMIN' },
        children: [
          { 
            path: 'dashboard', 
            loadComponent: () => import('./features/admin/dashboard/dashboard.component').then(m => m.DashboardComponent) 
          }
          // Additional admin routes will go here
        ]
      },
      {
        path: 'employee',
        data: { role: 'ROLE_EMPLOYEE' },
        children: [
          { 
            path: 'home', 
            loadComponent: () => import('./features/employee/home/home.component').then(m => m.HomeComponent) 
          }
          // Additional employee routes will go here
        ]
      }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
