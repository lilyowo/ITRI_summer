import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginHistoryService {
  private apiUrl = 'http://140.96.106.221:3000/auth/loginHistory';
  constructor(private http: HttpClient) {}

  recordLogin(userId: number): Observable<any> {
    return this.http.post(this.apiUrl, { userId });
  }
}
