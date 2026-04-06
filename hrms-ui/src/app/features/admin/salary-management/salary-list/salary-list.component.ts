import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { SalaryService } from '../../../../core/services/salary.service';
import { Salary } from '../../../../shared/models/salary.model';

@Component({
  selector: 'app-salary-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './salary-list.component.html',
  styleUrl: './salary-list.component.css'
})
export class SalaryListComponent implements OnInit {
  salaries = signal<Salary[]>([]);
  searchTerm = '';
  selectedStatus = '';

  constructor(
    private salaryService: SalaryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSalaries();
  }

  loadSalaries(): void {
    this.salaryService.getAll().subscribe({
      next: (data) => this.salaries.set(data),
      error: (err) => console.error('Error loading salaries:', err)
    });
  }

  filteredSalaries = computed(() => {
    return this.salaries().filter(s => {
      const matchesSearch = (s.employeeName + ' ' + s.paymentMonth)
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.selectedStatus ? s.status === this.selectedStatus : true;
      return matchesSearch && matchesStatus;
    });
  });

  filterSalaries(): void {}

  editSalary(id: number): void {
    this.router.navigate(['/admin/salaries/edit', id]);
  }

  deleteSalary(id: number): void {
    if (confirm('Are you sure you want to delete this payment record?')) {
      this.salaryService.delete(id).subscribe({
        next: () => {
          this.salaries.update(current => current.filter(s => s.id !== id));
        },
        error: (err) => console.error('Error deleting salary:', err)
      });
    }
  }
}
