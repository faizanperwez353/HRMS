import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeaveRequest } from '../../shared/models/leave-request.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {
  private apiUrl = `${environment.apiUrl}/leaves`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(this.apiUrl);
  }

  getMyLeaves(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${this.apiUrl}/my`);
  }

  applyLeave(leave: Partial<LeaveRequest>): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>(this.apiUrl, leave);
  }

  approveLeave(id: number): Observable<LeaveRequest> {
    return this.http.put<LeaveRequest>(`${this.apiUrl}/${id}/approve`, {});
  }

  rejectLeave(id: number): Observable<LeaveRequest> {
    return this.http.put<LeaveRequest>(`${this.apiUrl}/${id}/reject`, {});
  }
}
