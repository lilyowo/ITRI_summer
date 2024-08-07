import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Map2dComponent } from '../maps/map2d/map2d.component';
import { CentralCanvasComponent } from '../central-canvas/central-canvas.component';
import { ProjectService } from '../services/project.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  @ViewChild('centralCanvas') centralCanvalComponent!: CentralCanvasComponent;
  hideLeft: boolean = false;
  hideProgressBar: boolean = true;
  hideRight: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
  ) {}
  projectId!: number;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.projectId = params['projectId'];
    });
    this.projectService.initializeSimulationConf(this.projectId).subscribe(
      (response) => {
        console.log('SimulationConf initialized successfully', response);
      },
      (error) => {
        console.error('Error initializing SimulationConf', error);
      },
    );
  }
  toggleRightSettings() {
    this.hideRight = !this.hideRight;
  }

  startSimulation() {
    this.hideLeft = true;
    this.hideProgressBar = false;
  }
  currentView: string = '2D View';

  handleViewChange(view: string): void {
    this.currentView = view;
  }
  handleDataUpdated(): void {
    setTimeout(() => {
      this.centralCanvalComponent.handleDataUpdated(); // Reload the map after 1 second
    }, 1000);
  }
}
