import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppraisalService } from '../../../core/services/appraisal.service';
import { Appraisal } from '../../../shared/models/appraisal.model';

@Component({
  selector: 'app-appraisals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appraisals.component.html',
  styleUrl: './appraisals.component.css'
})
export class AppraisalsComponent implements OnInit {
  appraisals = signal<Appraisal[]>([]);

  constructor(private appraisalService: AppraisalService) { }

  ngOnInit(): void {
    this.loadMyAppraisals();
  }

  loadMyAppraisals(): void {
    this.appraisalService.getMe().subscribe({
      next: (data) => this.appraisals.set(data),
      error: (err) => console.error('Error loading your appraisals:', err)
    });
  }
}
