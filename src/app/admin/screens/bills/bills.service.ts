import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BillsService {

  // Replace this URL with the correct FastAPI server URL.
  private apiUrl = 'http://10.70.9.108:8001/data/';  // Ensure this is correct for file upload.

  constructor(private http: HttpClient) { }

  /**
   * Handle file upload and data extraction.
   * Sends a POST request with the file and optional custom filename.
   * 
   * @param formData The form data containing the file and optional filename.
   * @returns An Observable that emits the response from the server or an error fallback.
   */
  extractBillsData(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error connecting to FastAPI:', error); // Log the error for debugging

        // Return a fallback response when there is an error
        return of({
          success: false,
          message: 'Error connecting to the server. Please try again later.',
          error: error.message || 'Unknown error'
        });
      })
    );
  }
}
