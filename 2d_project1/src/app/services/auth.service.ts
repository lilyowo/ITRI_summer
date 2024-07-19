import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://140.96.106.221:3000/auth/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password });
  }

  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // 根據 token 解碼 userId
  getUserIdFromToken(): number | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = atob(token.split('.')[1]);
    const parsedPayload = JSON.parse(payload);
    return parsedPayload.userId;
  }
}
