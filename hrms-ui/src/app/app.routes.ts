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
          },
          { 
            path: 'employees', 
            loadComponent: () => import('./features/admin/employee-management/employee-list/employee-list.component').then(m => m.EmployeeListComponent) 
          },
          { 
            path: 'employees/new', 
            loadComponent: () => import('./features/admin/employee-management/employee-detail/employee-detail.component').then(m => m.EmployeeDetailComponent) 
          },
          { 
            path: 'employees/edit/:id', 
            loadComponent: () => import('./features/admin/employee-management/employee-detail/employee-detail.component').then(m => m.EmployeeDetailComponent) 
          },
          { 
            path: 'projects', 
            loadComponent: () => import('./features/admin/project-management/project-list/project-list.component').then(m => m.ProjectListComponent) 
          },
          { 
            path: 'projects/new', 
            loadComponent: () => import('./features/admin/project-management/project-detail/project-detail.component').then(m => m.ProjectDetailComponent) 
          },
          { 
            path: 'projects/edit/:id', 
            loadComponent: () => import('./features/admin/project-management/project-detail/project-detail.component').then(m => m.ProjectDetailComponent) 
          }
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
        ]
      }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
