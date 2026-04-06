import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { EmployeeService } from '../../../../core/services/employee.service';
import { Employee } from '../../../../shared/models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees = signal<Employee[]>([]);
  searchTerm = '';
  selectedDepartment = '';
  selectedStatus = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAll().subscribe({
      next: (data) => this.employees.set(data),
      error: (err) => console.error('Error loading employees:', err)
    });
  }

  filteredEmployees = computed(() => {
    return this.employees().filter(emp => {
      const matchesSearch = (emp.firstName + ' ' + emp.lastName + emp.email)
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      const matchesDept = this.selectedDepartment ? emp.departmentName === this.selectedDepartment : true;
      const matchesStatus = this.selectedStatus ? emp.status === this.selectedStatus : true;
      
      return matchesSearch && matchesDept && matchesStatus;
    });
  });

  filterEmployees(): void {
    // This triggers the computed signal re-evaluation
  }

  editEmployee(id: number): void {
    this.router.navigate(['/admin/employees/edit', id]);
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.delete(id).subscribe({
        next: () => {
          this.employees.update(current => current.filter(e => e.id !== id));
        },
        error: (err) => console.error('Error deleting employee:', err)
      });
    }
  }
}
