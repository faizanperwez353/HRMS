export interface Salary {
  id?: number;
  employeeId: number;
  employeeName?: string;
  basicSalary: number;
  bonus: number;
  deductions: number;
  paymentDate?: string;
  paymentMonth: string;
  status: string;
}
