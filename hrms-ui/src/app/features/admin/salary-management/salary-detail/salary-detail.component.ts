import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SalaryService } from '../../../../core/services/salary.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { Employee } from '../../../../shared/models/employee.model';

@Component({
  selector: 'app-salary-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './salary-detail.component.html',
  styleUrl: './salary-detail.component.css'
})
export class SalaryDetailComponent implements OnInit {
  salaryForm!: FormGroup;
  loading = signal(false);
  id = signal<number | null>(null);
  isEditMode = computed(() => this.id() !== null);
  employees = signal<Employee[]>([]);

  constructor(
    private fb: FormBuilder,
    private salaryService: SalaryService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadEmployees();
    const routeId = this.route.snapshot.params['id'];
    if (routeId) {
      this.id.set(+routeId);
      this.loadSalary(+routeId);
    }
  }

  private initForm(): void {
    this.salaryForm = this.fb.group({
      employeeId: [null, [Validators.required]],
      basicSalary: [0, [Validators.required, Validators.min(0)]],
      bonus: [0, [Validators.required, Validators.min(0)]],
      deductions: [0, [Validators.required, Validators.min(0)]],
      paymentMonth: [this.getCurrentMonth(), [Validators.required]],
      paymentDate: [new Date().toISOString().split('T')[0]],
      status: ['Pending', [Validators.required]]
    });
  }

  private getCurrentMonth(): string {
    const d = new Date();
    return d.toLocaleString('default', { month: 'long' }) + ' ' + d.getFullYear();
  }

  loadEmployees(): void {
    this.employeeService.getAll().subscribe(data => this.employees.set(data));
  }

  loadSalary(id: number): void {
    this.loading.set(true);
    this.salaryService.getById(id).subscribe({
      next: (s) => {
        this.salaryForm.patchValue(s);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading salary:', err);
        this.loading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.salaryForm.invalid) return;

    this.loading.set(true);
    const salaryData = this.salaryForm.value;

    if (this.isEditMode()) {
      this.salaryService.update(this.id()!, salaryData).subscribe({
        next: () => this.onSuccess(),
        error: (err) => this.onError(err)
      });
    } else {
      this.salaryService.create(salaryData).subscribe({
        next: () => this.onSuccess(),
        error: (err) => this.onError(err)
      });
    }
  }

  private onSuccess(): void {
    this.loading.set(false);
    this.router.navigate(['/admin/salaries']);
  }

  private onError(err: any): void {
    this.loading.set(false);
    console.error('Error saving salary:', err);
    alert('An error occurred. Please try again.');
  }
}
