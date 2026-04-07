export interface LeaveRequest {
  id?: number;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  employeeId: number;
  employeeName?: string;
}
