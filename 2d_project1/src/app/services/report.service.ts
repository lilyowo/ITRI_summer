import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private apiUrl = '';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) {
    this.configService.loadConfig().subscribe((config) => {
      this.apiUrl = `http://${config.backendIp}:${config.backendPort}/projectData`;
    });
  }

  updateConstellationSettings(
    projectId: number,
    reportId: number,
  ): Observable<any> {
    const params = { projectId, reportId };
    return this.configService.loadConfig().pipe(
      switchMap((config) => {
        const apiUrl = `http://${config.backendIp}:${config.backendPort}/report/updateSettings`;
        return this.http.post(apiUrl, params);
      }),
    );
  }

  exportConstellationSettingsAsCsv(reportId: number): Observable<Blob> {
    return this.configService.loadConfig().pipe(
      switchMap((config) => {
        const apiUrl = `http://${config.backendIp}:${config.backendPort}/report/exportConstellationSettingsAsCsv/${reportId}`;
        return this.http.get(apiUrl, { responseType: 'blob' });
      }),
    );
  }
}
