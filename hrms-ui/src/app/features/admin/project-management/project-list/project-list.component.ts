import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProjectService } from '../../../../core/services/project.service';
import { Project } from '../../../../shared/models/employee.model';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit {
  projects = signal<Project[]>([]);

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAll().subscribe({
      next: (data) => this.projects.set(data),
      error: (err) => console.error('Error loading projects:', err)
    });
  }

  editProject(id: number): void {
    this.router.navigate(['/admin/projects/edit', id]);
  }

  deleteProject(id: number): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.delete(id).subscribe({
        next: () => {
          this.projects.update(current => current.filter(p => p.id !== id));
        },
        error: (err) => console.error('Error deleting project:', err)
      });
    }
  }
}
