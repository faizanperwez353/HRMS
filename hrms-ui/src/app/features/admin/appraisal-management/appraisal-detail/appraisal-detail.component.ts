import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppraisalService } from '../../../../core/services/appraisal.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { Employee } from '../../../../shared/models/employee.model';

@Component({
  selector: 'app-appraisal-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './appraisal-detail.component.html',
  styleUrl: './appraisal-detail.component.css'
})
export class AppraisalDetailComponent implements OnInit {
  appraisalForm!: FormGroup;
  loading = signal(false);
  id = signal<number | null>(null);
  isEditMode = computed(() => this.id() !== null);
  employees = signal<Employee[]>([]);

  constructor(
    private fb: FormBuilder,
    private appraisalService: AppraisalService,
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
      this.loadAppraisal(+routeId);
    }
  }

  private initForm(): void {
    this.appraisalForm = this.fb.group({
      employeeId: [null, [Validators.required]],
      period: [this.getCurrentPeriod(), [Validators.required]],
      rating: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      feedback: ['', [Validators.required]],
      reviewedBy: ['', [Validators.required]],
      reviewDate: [new Date().toISOString().substring(0, 10)]
    });
  }

  private getCurrentPeriod(): string {
    const q = Math.floor((new Date().getMonth() + 3) / 3);
    return `Q${q} ${new Date().getFullYear()}`;
  }

  loadEmployees(): void {
    this.employeeService.getAll().subscribe(data => this.employees.set(data));
  }

  loadAppraisal(id: number): void {
    this.loading.set(true);
    this.appraisalService.getById(id).subscribe({
      next: (a) => {
        this.appraisalForm.patchValue(a);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading appraisal:', err);
        this.loading.set(false);
      }
    });
  }

  setRating(rating: number): void {
    this.appraisalForm.get('rating')?.setValue(rating);
  }

  onSubmit(): void {
    if (this.appraisalForm.invalid) return;

    this.loading.set(true);
    const appraisalData = this.appraisalForm.value;

    if (this.isEditMode()) {
      this.appraisalService.update(this.id()!, appraisalData).subscribe({
        next: () => this.onSuccess(),
        error: (err) => this.onError(err)
      });
    } else {
      this.appraisalService.create(appraisalData).subscribe({
        next: () => this.onSuccess(),
        error: (err) => this.onError(err)
      });
    }
  }

  private onSuccess(): void {
    this.loading.set(false);
    this.router.navigate(['/admin/appraisals']);
  }

  private onError(err: any): void {
    this.loading.set(false);
    console.error('Error saving appraisal:', err);
    alert('An error occurred. Please try again.');
  }
}
