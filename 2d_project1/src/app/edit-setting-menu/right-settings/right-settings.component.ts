import { Component, OnInit, EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-right-settings',
  templateUrl: './right-settings.component.html',
  styleUrls: ['./right-settings.component.css']
})
export class RightSettingsComponent implements OnInit {
  @Output() startSimulation = new EventEmitter<void>();
  isReadonly = false;
  simulationTime:number = 0;
  simulationButtonText: string = 'Start Simulation';

  constructor() { }

  ngOnInit(): void {
  }
  onStartSimulation() {
    this.simulationButtonText = 'Simulating...';
    this.startSimulation.emit();
    this.isReadonly = true;
  }

}
