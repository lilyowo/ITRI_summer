import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface BackendConfig {
  backendIp: string;
  backendPort: number;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private configUrl = '../../config/config.json';
  private config: BackendConfig | undefined;

  constructor(private http: HttpClient) {}

  loadConfig(): Observable<BackendConfig> {
    return this.http.get<BackendConfig>(this.configUrl).pipe(
      map((config) => {
        this.config = config;
        return config;
      }),
    );
  }

  getConfig(): BackendConfig | undefined {
    return this.config;
  }
}
