import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class aadhaarService {
  private baseUrl = 'http://10.60.1.99:9001'; // Base URL to FastAPI backend

  constructor(private http: HttpClient) {}

  // General function to send file with doc_type
  extractData(formData: FormData, docType: string): Observable<any> {
    const apiUrl = `${this.baseUrl}/extract-fields/?doc_type=${docType}`;
    return this.http.post<any>(apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error connecting to FastAPI:', error);
        return of({ error: 'Error connecting to FastAPI.' });
      })
    );
  }
}
