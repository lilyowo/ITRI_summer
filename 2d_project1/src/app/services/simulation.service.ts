import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ConfigService } from './config.service';
import { switchMap, concatMap } from 'rxjs/operators';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root',
})
export class SimulationService {
  private startedSimulationKey = 'startedSimulation';
  private simulationDataSubject = new BehaviorSubject<any[]>([]);
  simulationData$ = this.simulationDataSubject.asObservable();

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private taskService: TaskService,
  ) {}

  setStartedSimulation(value: boolean): void {
    localStorage.setItem(this.startedSimulationKey, JSON.stringify(value));
  }

  getStartedSimulation(): boolean {
    const value = localStorage.getItem(this.startedSimulationKey);
    return value ? JSON.parse(value) : false;
  }

  clearStartedSimulation(): void {
    localStorage.removeItem(this.startedSimulationKey);
  }

  getSimulationResults(projectId: number, simuTime: number): Observable<any> {
    return this.configService.loadConfig().pipe(
      switchMap((config) => {
        const apiUrl = `http://${config.backendIp}:${config.backendPort}/server`;

        // 先執行 setSimuConfig
        return this.taskService.setSimuConfig(projectId).pipe(
          // 等待 setSimuConfig 完成後，再執行 makeSimulationResult
          concatMap(() =>
            this.http.post(`${apiUrl}/makeSimulationResult/${projectId}`, {
              simuTime,
            }),
          ),
        );
      }),
    );
  }
  setSimulationData(data: any[]) {
    this.simulationDataSubject.next(data);
  }

  getDataAtTime(time: number) {
    return this.simulationDataSubject.value.find((item) => item.time === time);
  }
}
