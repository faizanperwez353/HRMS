import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appraisal } from '../../shared/models/appraisal.model';

@Injectable({
  providedIn: 'root'
})
export class AppraisalService {
  private readonly apiUrl = 'http://localhost:8080/api/appraisals';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Appraisal[]> {
    return this.http.get<Appraisal[]>(this.apiUrl);
  }

  getById(id: number): Observable<Appraisal> {
    return this.http.get<Appraisal>(`${this.apiUrl}/${id}`);
  }

  getByEmployee(employeeId: number): Observable<Appraisal[]> {
    return this.http.get<Appraisal[]>(`${this.apiUrl}/employee/${employeeId}`);
  }

  getMe(): Observable<Appraisal[]> {
    return this.http.get<Appraisal[]>(`${this.apiUrl}/me`);
  }

  create(appraisal: Appraisal): Observable<Appraisal> {
    return this.http.post<Appraisal>(this.apiUrl, appraisal);
  }

  update(id: number, appraisal: Appraisal): Observable<Appraisal> {
    return this.http.put<Appraisal>(`${this.apiUrl}/${id}`, appraisal);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
