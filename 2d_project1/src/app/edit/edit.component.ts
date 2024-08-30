import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CentralCanvasComponent } from '../central-canvas/central-canvas.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { ProjectService } from '../services/project.service';
import { SimulationService } from '../services/simulation.service';
import { UserService } from '../services/user.service'; // for nav-bar title update

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, OnDestroy {
  @ViewChild('centralCanvas') centralCanvasComponent!: CentralCanvasComponent;
  @ViewChild('progressBar') progressBar!: ProgressBarComponent;
  hideLeft: boolean = false;
  hideProgressBar: boolean = true;
  hideRight: boolean = false;
  startedSimulation: boolean = false;
  loading = false;
  projectId!: number;
  simuTime: number = 100;
  reportId: number = 1;
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private simulationService: SimulationService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.startedSimulation = this.simulationService.getStartedSimulation();
    this.updateUI();
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
    // Update project lastEditTime
    this.projectService.updateLastEditTime(this.projectId).subscribe(
      () => {
        console.log('update project lastEditTime successfully');
      },
      (error) => {
        console.error('Error updating project lastEditTime', error);
      },
    );
  }
  ngOnDestroy(): void {
    this.startedSimulation = false;
    this.simulationService.setStartedSimulation(false);
  }
  onUploadStart() {
    this.loading = true;
  }
  onUploadEnd() {
    this.loading = false;
    window.location.reload();
    // this.handleDataUpdated();
  }
  onUploadEndWithoutReload() {
    this.loading = false;
  }
  toggleRightSettings() {
    this.hideRight = !this.hideRight;
  }

  onTimeChanged(time: number) {
    if (
      this.centralCanvasComponent &&
      this.centralCanvasComponent.map2dComponent
    ) {
      this.centralCanvasComponent.map2dComponent.updateSatellitePositions(time);
    } else {
      console.log('map2dComponent not found');
    }
  }

  startSimulation(simulationTime: number) {
    this.startedSimulation = true;
    this.simulationService.setStartedSimulation(true);
    this.updateUI();
    this.userService.triggerNavBarUpdate();
    this.simuTime = simulationTime;
    // this.progressBarComponent.setTotalTime(simulationTime);
  }
  endSimulation(reportId: number) {
    this.reportId = reportId;
    this.userService.triggerNavBarUpdate(); //for message most recent report correct
    if (this.progressBar) {
      this.progressBar.play();
    }
  }
  private updateUI(): void {
    if (this.startedSimulation) {
      this.hideLeft = true;
      this.hideProgressBar = false;
    } else {
      this.hideLeft = false;
      this.hideProgressBar = true;
    }
  }

  currentView: string = '2D View';

  handleViewChange(view: string): void {
    this.currentView = view;
  }
  handleDataUpdated(): void {
    // setTimeout(() => {
    //   this.centralCanvasComponent.handleDataUpdated(); // Reload the map after 1 second
    // }, 1000);
    this.onUploadEnd();
  }
}
