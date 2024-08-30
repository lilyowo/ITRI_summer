import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  private apiUrl = 'http://localhost:3000/export';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) {
    this.configService.loadConfig().subscribe((config) => {
      this.apiUrl = `http://${config.backendIp}:${config.backendPort}/export`;
    });
  }

  exportReport(reportId: number, format: string): Observable<Blob> {
    return this.configService.loadConfig().pipe(
      switchMap((config) => {
        const apiUrl = `http://${config.backendIp}:${config.backendPort}/export`;
        return this.http.get(`${apiUrl}/${reportId}/${format}`, {
          responseType: 'blob',
        });
      }),
    );
  }
}
