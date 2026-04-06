export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth?: string;
  joiningDate?: string;
  designation: string;
  employmentType: string;
  status: string;
  departmentId?: number;
  departmentName?: string;
  userId?: number;
  username?: string;
  projectIds?: number[];
  skillIds?: number[];
}

export interface Project {
  id?: number;
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  status: string;
}
