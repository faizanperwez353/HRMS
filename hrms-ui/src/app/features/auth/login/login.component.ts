import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  loading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(event: Event): void {
    event.preventDefault();
    this.loading.set(true);
    this.errorMessage.set(null);

    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (user) => {
        const roles = user.roles;
        if (roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/employee/home']);
        }
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set('Invalid credentials or server error. Please try again.');
        console.error('Login error:', err);
      }
    });
  }
}
