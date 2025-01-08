import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';  // Import catchError
import { of } from 'rxjs';  // Import 'of' to return an observable

@Injectable({
  providedIn: 'root'
})
export class billsService {

  private apiUrl = 'http://127.0.0.1:8000/extract-marksheet-data/';  // FastAPI endpoint

  constructor(private http: HttpClient) { }

  // Function to send file and receive Aadhaar data
  extractAadhaarData(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData).pipe(
      catchError(error => {
        console.error('Error connecting to FastAPI:', error);  // Log the error
        return of({ error: 'Error connecting to FastAPI.' });  // Return a default response
      })
    );
  }

  // Function to test connection to FastAPI backend
  testConnection(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error connecting to FastAPI:', error);  // Log the error
        return of({ error: 'Error connecting to FastAPI.' });  // Return a default response
      })
    );
  }
}
