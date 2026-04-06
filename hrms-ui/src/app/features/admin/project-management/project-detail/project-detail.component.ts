import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjectService } from '../../../../core/services/project.service';
import { Project } from '../../../../shared/models/employee.model';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent implements OnInit {
  projectForm!: FormGroup;
  loading = signal(false);
  id = signal<number | null>(null);
  isEditMode = computed(() => this.id() !== null);

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    const routeId = this.route.snapshot.params['id'];
    if (routeId) {
      this.id.set(+routeId);
      this.loadProject(+routeId);
    }
  }

  private initForm(): void {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      startDate: [new Date().toISOString().substring(0, 10), [Validators.required]],
      endDate: ['', [Validators.required]],
      status: ['Planned', [Validators.required]]
    });
  }

  loadProject(id: number): void {
    this.loading.set(true);
    this.projectService.getById(id).subscribe({
      next: (proj) => {
        this.projectForm.patchValue(proj);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading project:', err);
        this.loading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.projectForm.invalid) return;

    this.loading.set(true);
    const projectData = this.projectForm.value;

    if (this.isEditMode()) {
      this.projectService.update(this.id()!, projectData).subscribe({
        next: () => this.onSuccess(),
        error: (err) => this.onError(err)
      });
    } else {
      this.projectService.create(projectData).subscribe({
        next: () => this.onSuccess(),
        error: (err) => this.onError(err)
      });
    }
  }

  private onSuccess(): void {
    this.loading.set(false);
    this.router.navigate(['/admin/projects']);
  }

  private onError(err: any): void {
    this.loading.set(false);
    console.error('Error saving project:', err);
    alert('An error occurred while saving. Please try again.');
  }
}
