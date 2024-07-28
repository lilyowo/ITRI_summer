import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private apiUrl = 'http://localhost:3000/chart';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) {
    this.configService.loadConfig().subscribe((config) => {
      this.apiUrl = `http://${config.serverIp}:${config.serverPort}/chart`;
    });
    
  }

  getCharts(): Observable<any[]> {
    
    return this.configService.loadConfig().pipe(
      switchMap((config) => {
        const apiUrl = `http://${config.serverIp}:${config.serverPort}/chart`;
        return this.http.get<any[]>(apiUrl);
      }),
    );
  }
  getChartsByReportId(reportId: number): Observable<any[]> {
    return this.configService.loadConfig().pipe(
      switchMap((config) => {
        const apiUrl = `http://${config.serverIp}:${config.serverPort}/chart`;
        return this.http.get<any[]>(`${apiUrl}/${reportId}`);
      }),
    );
  }

  getReportTitleByReportId(reportId: number): Observable<any[]> {
    return this.configService.loadConfig().pipe(
      switchMap((config) => {
        const apiUrl = `http://${config.serverIp}:${config.serverPort}/chart`;
        return this.http.get<any[]>(`${apiUrl}/report/${reportId}`);
      }),
    );
  }
}
