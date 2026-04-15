import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) { }
  goToLeave() {
    this.router.navigate(['/employee/apply-leave']);
  }
  userName = computed(() => this.authService.currentUser()?.username || 'User');
  userEmail = computed(() => this.authService.currentUser()?.email || 'N/A');
}
