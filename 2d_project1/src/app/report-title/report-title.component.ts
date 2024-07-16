import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
// import { Project } from '../models/project.model';  
// import { Simulation } from '../models/simulation.model';  


@Component({
  selector: 'app-report-title',
  templateUrl: './report-title.component.html',
  styleUrls: ['./report-title.component.css']
})
export class ReportTitleComponent{
  @Input() simulationName: string = 'project1';
  @Input() simulationTime: string = '2024.07.11 16:04:00';
  @Output() export: EventEmitter<string> = new EventEmitter();
  @Output() edit: EventEmitter<void> = new EventEmitter();

  constructor(private router: Router) { }
  showExportMenu: boolean = false;

  onExportClick(): void {
    this.showExportMenu = !this.showExportMenu;
  }


  

  exportAs(format: string): void {
    this.export.emit(format);
    this.showExportMenu = false;
  }

  

}
