import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AppraisalService } from '../../../../core/services/appraisal.service';
import { Appraisal } from '../../../../shared/models/appraisal.model';

@Component({
  selector: 'app-appraisal-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './appraisal-list.component.html',
  styleUrl: './appraisal-list.component.css'
})
export class AppraisalListComponent implements OnInit {
  appraisals = signal<Appraisal[]>([]);

  constructor(
    private appraisalService: AppraisalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAppraisals();
  }

  loadAppraisals(): void {
    this.appraisalService.getAll().subscribe({
      next: (data) => this.appraisals.set(data),
      error: (err) => console.error('Error loading appraisals:', err)
    });
  }

  editAppraisal(id: number): void {
    this.router.navigate(['/admin/appraisals/edit', id]);
  }

  deleteAppraisal(id: number): void {
    if (confirm('Are you sure you want to delete this appraisal record?')) {
      this.appraisalService.delete(id).subscribe({
        next: () => {
          this.appraisals.update(current => current.filter(a => a.id !== id));
        },
        error: (err) => console.error('Error deleting appraisal:', err)
      });
    }
  }
}
