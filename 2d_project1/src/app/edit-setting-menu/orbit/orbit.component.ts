import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-orbit',
  templateUrl: './orbit.component.html',
  styleUrls: ['./orbit.component.css'],
})
export class OrbitComponent implements OnInit {
  orbitData: any[] = [];
  @Input() projectId!: number;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this.projectService.getPlanesByProjectId(this.projectId).subscribe(
      (data) => {
        this.orbitData = data;
      },
      (error) => {
        console.error('Error loading Plane data:', error);
      },
    );
  }
}
