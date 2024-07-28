import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {

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
    return this.http.get<any[]>(this.apiUrl);
  }
}
