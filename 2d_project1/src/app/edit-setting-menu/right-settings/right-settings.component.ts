import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SimulationService } from 'src/app/services/simulation.service';
@Component({
  selector: 'app-right-settings',
  templateUrl: './right-settings.component.html',
  styleUrls: ['./right-settings.component.css'],
})
export class RightSettingsComponent implements OnInit {
  @Output() startSimulation = new EventEmitter<number>();
  @Output() endSimulation = new EventEmitter<number>();
  @Output() dataUpdated = new EventEmitter<void>();
  @Output() uploadStart = new EventEmitter<void>();
  @Output() uploadEnd = new EventEmitter<void>();
  @Input() projectId!: number;
  isReadonly = false;
  simulationTime: number = 60;
  simulationButtonText: string = 'Start Simulation';

  constructor(private simulationService: SimulationService) {}

  ngOnInit(): void {
    const startedSimulation = this.simulationService.getStartedSimulation();
    this.updateButtonState(startedSimulation);
  }
  onStartSimulation() {
    this.simulationButtonText = 'Simulating...';
    this.startSimulation.emit(this.simulationTime);
    this.uploadStart.emit();
    this.isReadonly = true;
    this.simulationService.setStartedSimulation(true);
    this.simulationService
      .getSimulationResults(this.projectId, this.simulationTime)
      .subscribe(
        (response) => {
          this.simulationService.setSimulationData(response.simulationInfo);
          this.uploadEnd.emit();
          this.endSimulation.emit(response.reportId);
          console.log('Simulation results received', response);
        },
        (error) => {
          console.error('Error fetching simulation results', error);
        },
      );
  }
  private updateButtonState(started: boolean): void {
    if (started) {
      this.simulationButtonText = 'Simulating...';
      this.isReadonly = true;
    } else {
      this.simulationButtonText = 'Start Simulation';
      this.isReadonly = false;
    }
  }
  handleDataUpdated(): void {
    this.dataUpdated.emit(); // 發出事件
  }
  onUploadStart() {
    this.uploadStart.emit();
  }
  onUploadEnd() {
    this.uploadEnd.emit();
  }
}
