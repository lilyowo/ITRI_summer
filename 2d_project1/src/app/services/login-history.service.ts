import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class LoginHistoryService {
  private apiUrl = '';
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) {
    this.configService.loadConfig().subscribe((config) => {
      this.apiUrl = `http://${config.serverIp}:${config.serverPort}/auth/loginHistory`;
    });
    
  }

  recordLogin(userId: number): Observable<any> {
    return this.http.post(this.apiUrl, { userId });
  }
}
