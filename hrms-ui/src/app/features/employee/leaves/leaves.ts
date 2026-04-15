import { AfterViewInit, Component, ViewChild, ElementRef } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LeaveRequestService } from "../../../core/services/leave-request.service";
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-apply-leave',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leaves.html',
  styleUrls: ['./leaves.css']
})
export class ApplyLeaveComponent implements AfterViewInit {

  @ViewChild('chartCanvas') chartRef!: ElementRef;
  chart: any;

  leave = {
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  };

  constructor(private leaveService: LeaveRequestService) { }

  ngAfterViewInit() {
    setTimeout(() => this.loadChart(), 0);
  }

  loadChart() {
    this.leaveService.getMyLeaves().subscribe({
      next: (res: any[]) => {

        console.log("API Data:", res);

        const totalLeaves = 20;
        const usedLeaves = res.filter(l => l.status === 'APPROVED').length;
        const remainingLeaves = totalLeaves - usedLeaves;

        if (this.chart) {
          this.chart.destroy();
        }

        this.chart = new Chart(this.chartRef.nativeElement, {
          type: 'doughnut',
          data: {
            labels: ['Used Leaves', 'Remaining Leaves'],
            datasets: [{
              data: [usedLeaves, remainingLeaves],
              backgroundColor: ['#6366f1', '#10b981'],
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: '#ffffff'
                }
              },
              tooltip: {
                callbacks: {
                  label: (ctx: any) => `${ctx.label}: ${ctx.raw} days`
                }
              }
            }
          }
        });
      },
      error: (err) => {
        console.error("Error fetching leave balance", err);
      }
    });
  }

  submit() {
    this.leaveService.applyLeave(this.leave).subscribe({
      next: () => {
        alert('Leave applied successfully');
        this.resetForm();
        this.loadChart();
      },
      error: (err) => {
        console.error(err);
        alert('Error applying leave');
      }
    });
  }

  resetForm() {
    this.leave = {
      leaveType: '',
      startDate: '',
      endDate: '',
      reason: ''
    };
  }
}