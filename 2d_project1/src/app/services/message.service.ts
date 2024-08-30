import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = 'http://localhost:3000/project';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) {
    this.configService.loadConfig().subscribe((config) => {
      this.apiUrl = `http://${config.backendIp}:${config.backendPort}/project`;
    });
  }
  getRecentReport(userId: number): Observable<any[]> {
    return this.configService.loadConfig().pipe(
      switchMap((config) => {
        const apiUrl = `http://${config.backendIp}:${config.backendPort}/project`;
        return this.http.get<any[]>(`${apiUrl}/recent/${userId}`);
      }),
    );
  }
}
