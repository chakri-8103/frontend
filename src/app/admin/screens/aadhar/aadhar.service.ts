import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class aadhaarService {
  private baseUrl = 'http://10.70.9.108:8000'; // Base URL to FastAPI backend

  constructor(private http: HttpClient) {}

  // Function to send file and receive Aadhaar data
  extractAadhaarData(formData: FormData): Observable<any> {
    const apiUrl = `${this.baseUrl}/extract-aadhaar-data/`; // Correct endpoint for Aadhaar data extraction
    return this.http.post<any>(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error connecting to FastAPI:', error); // Log the error
        return of({ error: 'Error connecting to FastAPI.' }); // Return a default response
      })
    );
  }

  // Function to send file and receive mark-sheet data
  extractMarksheetData(formData: FormData): Observable<any> {
    const apiUrl = `${this.baseUrl}/extract-marksheet-data/`; // Correct endpoint for marksheet data extraction
    return this.http.post<any>(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error connecting to FastAPI:', error); // Log the error
        return of({ success: false, message: 'Error connecting to FastAPI.', error });
      })
    );
  }

  // Function to send file and receive bills data
  extractBillsData(formData: FormData): Observable<any> {
    const apiUrl = `${this.baseUrl}/data/`; // Correct endpoint for bills data extraction
    return this.http.post<any>(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error connecting to FastAPI:', error); // Log the error
        return of({ success: false, message: 'Error connecting to FastAPI.', error });
      })
    );
  }

  // Function to test connection to FastAPI backend
  testConnection(): Observable<any> {
    const apiUrl = `${this.baseUrl}/test-connection/`; // General endpoint to test the connection
    return this.http.get<any>(apiUrl).pipe(
      catchError((error) => {
        console.error('Error connecting to FastAPI:', error); // Log the error
        return of({ error: 'Error connecting to FastAPI.' }); // Return a default response
      })
    );
  }
}
