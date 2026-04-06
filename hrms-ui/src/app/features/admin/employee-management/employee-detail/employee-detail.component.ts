import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../../../core/services/employee.service';
import { Employee } from '../../../../shared/models/employee.model';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent implements OnInit {
  employeeForm!: FormGroup;
  loading = signal(false);
  id = signal<number | null>(null);
  isEditMode = computed(() => this.id() !== null);

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    const routeId = this.route.snapshot.params['id'];
    if (routeId) {
      this.id.set(+routeId);
      this.loadEmployee(+routeId);
    }
  }

  private initForm(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      departmentId: [null],
      joiningDate: [new Date().toISOString().substring(0, 10), [Validators.required]],
      employmentType: ['Full-time', [Validators.required]],
      status: ['Active', [Validators.required]]
    });
  }

  loadEmployee(id: number): void {
    this.loading.set(true);
    this.employeeService.getById(id).subscribe({
      next: (emp) => {
        this.employeeForm.patchValue(emp);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading employee:', err);
        this.loading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) return;

    this.loading.set(true);
    const employeeData = this.employeeForm.value;

    if (this.isEditMode()) {
      this.employeeService.update(this.id()!, employeeData).subscribe({
        next: () => this.onSuccess(),
        error: (err) => this.onError(err)
      });
    } else {
      this.employeeService.create(employeeData).subscribe({
        next: () => this.onSuccess(),
        error: (err) => this.onError(err)
      });
    }
  }

  private onSuccess(): void {
    this.loading.set(false);
    this.router.navigate(['/admin/employees']);
  }

  private onError(err: any): void {
    this.loading.set(false);
    console.error('Error saving employee:', err);
    alert('An error occurred while saving. Please try again.');
  }
}
