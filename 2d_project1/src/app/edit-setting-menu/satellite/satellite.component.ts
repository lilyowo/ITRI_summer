import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-satellite',
  templateUrl: './satellite.component.html',
  styleUrls: ['./satellite.component.css'],
})
export class SatelliteComponent implements OnInit {
  satelliteData: any[] = [];
  @Input() projectId!: number;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this.projectService.getSatellitesByProjectId(this.projectId).subscribe(
      (data) => {
        this.satelliteData = data;
      },
      (error) => {
        console.error('Error loading Satelllite data:', error);
      },
    );
  }
}
