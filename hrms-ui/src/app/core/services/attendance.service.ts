import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance } from '../../shared/models/attendance.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = `${environment.apiUrl}/attendance`;

  constructor(private http: HttpClient) {}

  getMyAttendance(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.apiUrl}/my`);
  }

  checkIn(): Observable<Attendance> {
    return this.http.post<Attendance>(`${this.apiUrl}/check-in`, {});
  }

  checkOut(): Observable<Attendance> {
    return this.http.put<Attendance>(`${this.apiUrl}/check-out`, {});
  }
}
