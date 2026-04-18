import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Salary } from '../../shared/models/salary.model';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  private readonly apiUrl = `${environment.apiUrl}/salaries`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Salary[]> {
    return this.http.get<Salary[]>(this.apiUrl);
  }

  getByEmployeeId(employeeId: number): Observable<Salary[]> {
    return this.http.get<Salary[]>(`${this.apiUrl}/employee/${employeeId}`);
  }

  getMe(): Observable<Salary[]> {
    return this.http.get<Salary[]>(`${this.apiUrl}/me`);
  }

  getById(id: number): Observable<Salary> {
    return this.http.get<Salary>(`${this.apiUrl}/${id}`);
  }

  create(salary: Salary): Observable<Salary> {
    return this.http.post<Salary>(this.apiUrl, salary);
  }

  update(id: number, salary: Salary): Observable<Salary> {
    return this.http.put<Salary>(`${this.apiUrl}/${id}`, salary);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
