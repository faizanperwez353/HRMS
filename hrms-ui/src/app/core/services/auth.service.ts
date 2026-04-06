import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse, User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/api/auth';
  
  // Use Angular Signals for state management
  currentUser = signal<User | null>(this.getUserFromStorage());

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signin`, credentials).pipe(
      tap(response => {
        const user: User = {
          id: response.id,
          username: response.username,
          email: response.email,
          roles: response.roles,
          token: response.accessToken
        };
        this.saveUser(user);
        this.currentUser.set(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('hrms_user');
    this.currentUser.set(null);
  }

  isAdmin(): boolean {
    const user = this.currentUser();
    return !!user?.roles.includes('ROLE_ADMIN');
  }

  isEmployee(): boolean {
    const user = this.currentUser();
    return !!user?.roles.includes('ROLE_EMPLOYEE');
  }

  private saveUser(user: User): void {
    localStorage.setItem('hrms_user', JSON.stringify(user));
  }

  private getUserFromStorage(): User | null {
    const stored = localStorage.getItem('hrms_user');
    return stored ? JSON.parse(stored) : null;
  }
}
