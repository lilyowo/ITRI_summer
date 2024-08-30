import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) {}

  uploadTle(tle: string, projectId: number): Observable<any> {
    return this.configService.loadConfig().pipe(
      switchMap((config) => {
        const apiUrl = `http://${config.backendIp}:${config.backendPort}/server`;
        return this.http.post(`${apiUrl}/tle/${projectId}`, { tle });
      }),
    );
  }
  islSetting(projectId: number, islSettings: any): Observable<any> {
    return this.configService.loadConfig().pipe(
      switchMap((config) => {
        const apiUrl = `http://${config.backendIp}:${config.backendPort}/server`;
        return this.http.post(`${apiUrl}/isl/${projectId}`, { islSettings });
      }),
    );
  }

  addGroundStation(projectId: number, gsInfo: any): Observable<any> {
    return this.configService.loadConfig().pipe(
      switchMap((config) => {
        const apiUrl = `http://${config.backendIp}:${config.backendPort}/server`;
        return this.http.post(`${apiUrl}/addGroundStation/${projectId}`, {
          gsInfo,
        });
      }),
    );
  }

  modifyGroundStation(projectId: number, gsInfo: any): Observable<any> {
    return this.configService.loadConfig().pipe(
      switchMap((config) => {
        const apiUrl = `http://${config.backendIp}:${config.backendPort}/server`;
        return this.http.post(`${apiUrl}/modifyGroundStation/${projectId}`, {
          gsInfo,
        });
      }),
    );
  }

  deleteGroundStation(gsId: number): Observable<any> {
    return this.configService.loadConfig().pipe(
      switchMap((config) => {
        const apiUrl = `http://${config.backendIp}:${config.backendPort}/server`;
        return this.http.post(`${apiUrl}/deleteGroundStation/${gsId}`, {});
      }),
    );
  }

  cplSetting(projectId: number, cplSettings: any): Observable<any> {
    return this.configService.loadConfig().pipe(
      switchMap((config) => {
        const apiUrl = `http://${config.backendIp}:${config.backendPort}/server`;
        return this.http.post(`${apiUrl}/setCplConfig/${projectId}`, {
          cplSettings,
        });
      }),
    );
  }

  setSimuConfig(projectId: number): Observable<any> {
    return this.configService.loadConfig().pipe(
      switchMap((config) => {
        const apiUrl = `http://${config.backendIp}:${config.backendPort}/server`;
        return this.http.post(`${apiUrl}/setSimuConfig/${projectId}`, {});
      }),
    );
  }

  sendTask(task: any): Observable<any> {
    return this.configService.loadConfig().pipe(
      switchMap((config) => {
        const apiUrl = `http://${config.backendIp}:${config.backendPort}/server`;
        return this.http.post(`${apiUrl}/task`, task);
      }),
    );
  }

  sendTask2(task: any): Observable<any> {
    return this.configService.loadConfig().pipe(
      switchMap((config) => {
        const apiUrl = `http://${config.backendIp}:${config.backendPort}/server`;
        return this.http.post(`${apiUrl}/task2`, task);
      }),
    );
  }
}
