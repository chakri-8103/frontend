import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormConfigService {
  private jsonUrl = 'assets/form-config.json';

  constructor(private http: HttpClient) {}

  getFormConfig(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  } 
}
 