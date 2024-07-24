// src/app/services/project.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { Project } from '../models/project.model';
import { Simulation } from '../models/simulation.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = '';//http://192.168.239.1:3000/project

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) {
    this.configService.loadConfig().subscribe((config) => {
      this.apiUrl = `http://${config.serverIp}:${config.serverPort}/project`;
    });
    
  }

  getProjectsByUserId(userId: number): Observable<Project[]> {    
    return this.configService.loadConfig().pipe(
      switchMap(config => {
        const apiUrl = `http://${config.serverIp}:${config.serverPort}/project`;
        return this.http.get<any[]>(`${apiUrl}/user/${userId}`);
      }),
      map((response) =>
        response.map((project) => ({
          name: project.projectName,
          id: project.projectId,
          date: project.lastEditTime, //.toString()？https://stackoverflow.com/questions/19485353/function-to-convert-timestamp-to-human-date-in-javascript
          expanded: false,
          simulations: [] as Simulation[],
        })),
      ),
    );
  }

  getReportsByProjectId(projectId: number): Observable<Simulation[]> {
    return this.configService.loadConfig().pipe(
      switchMap(config => {
        const apiUrl = `http://${config.serverIp}:${config.serverPort}/project`;
        return this.http.get<any[]>(`${apiUrl}/report/${projectId}`);
      }),
      map((response) =>
        response.map((report) => ({
          name: report.reportName,
          id: report.reportId,
          date: report.simuTime, //.toString()？ moment.js？
        })),
      ),
    );
  }

  addProject(userId: number, projectName: string): Observable<any> {
    return this.configService.loadConfig().pipe(
      switchMap(config => {
        const apiUrl = `http://${config.serverIp}:${config.serverPort}/project`;
        return this.http.post<any>(apiUrl, { userId, projectName });
      })
    );
  }
}
