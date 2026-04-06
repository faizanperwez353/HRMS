import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.currentUser();

  if (user) {
    // Check role from route data if present
    const expectedRole = route.data['role'];
    if (expectedRole && !user.roles.includes(expectedRole)) {
      router.navigate(['/unauthorized']);
      return false;
    }
    return true;
  }

  // Not logged in, redirect to login
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
