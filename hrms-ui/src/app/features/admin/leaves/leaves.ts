import { Component } from "@angular/core";
import { LeaveRequestService } from "../../../core/services/leave-request.service";

@Component({
  selector: 'app-manage-leaves',
  templateUrl: './leaves.html',
  standalone: true,
})
export class ManageLeavesComponent {

  leaves: any[] = [];

  constructor(private leaveService: LeaveRequestService) { }

  ngOnInit() {
    this.loadLeaves();
  }

  loadLeaves() {
    this.leaveService.getAll()
      .subscribe((data: any) => this.leaves = data);
  }

  approve(id: number) {
    this.leaveService.approveLeave(id).subscribe(() => this.loadLeaves());
  }

  reject(id: number) {
    this.leaveService.rejectLeave(id).subscribe(() => this.loadLeaves());
  }
}