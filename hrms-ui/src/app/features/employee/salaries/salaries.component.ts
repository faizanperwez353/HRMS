import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryService } from '../../../core/services/salary.service';
import { Salary } from '../../../shared/models/salary.model';

@Component({
  selector: 'app-salaries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './salaries.component.html',
  styleUrl: './salaries.component.css'
})
export class SalariesComponent implements OnInit {
  salaries = signal<Salary[]>([]);

  constructor(private salaryService: SalaryService) {}

  ngOnInit(): void {
    this.loadMySalaries();
  }

  loadMySalaries(): void {
    this.salaryService.getMe().subscribe({
      next: (data) => this.salaries.set(data),
      error: (err) => console.error('Error loading your salaries:', err)
    });
  }
}
