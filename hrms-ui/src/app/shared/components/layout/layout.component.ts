import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isSidebarCollapsed = false;
  isProfileMenuOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  userName = computed(() => this.authService.currentUser()?.username || 'User');
  userRole = computed(() => {
    const roles = this.authService.currentUser()?.roles;
    if (!roles) return '';
    return roles.includes('ROLE_ADMIN') ? 'Administrator' : 'Employee';
  });

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isEmployee(): boolean {
    return this.authService.isEmployee();
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
