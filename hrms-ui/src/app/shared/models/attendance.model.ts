export interface Attendance {
  id?: number;
  date: string;
  checkIn: string;
  checkOut?: string;
  employeeId: number;
  employeeName?: string;
}
