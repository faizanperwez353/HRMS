export interface Appraisal {
  id?: number;
  employeeId: number;
  employeeName?: string;
  rating: number; // 1-5
  feedback: string;
  reviewedBy: string;
  reviewDate?: string;
  period: string; // e.g., "Q1 2026"
}
