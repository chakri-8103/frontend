import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseUrl = 'http://10.70.3.135:3006/api/student'; // Base URL for your APIs

  constructor(private http: HttpClient) {}

  // Get TC info for a student
  getTCInfo(studentId: number): Observable<any> {
    const url = `${this.baseUrl}/getTCinfo/${studentId}`;
    return this.http.get<any>(url); // Returns data as Observable
  }

  // Issue a Transfer Certificate for a student
  issueTC(data: any): Observable<any> {
    const url = `${this.baseUrl}/issueTC`;
    return this.http.post<any>(url, data); // Sends data in POST request
  }

  // Confirm the TC issuance for a student
  confirmIssuedTC(data: any): Observable<any> {
    const url = `${this.baseUrl}/tcIssuedConfirm`;
    return this.http.post<any>(url, data); // Sends data in POST request
  }

  viewTC(studentId: number): Observable<any> {
    const url = `${this.baseUrl}/viewTC/${studentId}`;
    return this.http.get<any>(url); // Returns data as Observable
  }
}
