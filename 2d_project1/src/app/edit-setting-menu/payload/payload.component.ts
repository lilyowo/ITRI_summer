import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-payload',
  templateUrl: './payload.component.html',
  styleUrls: ['./payload.component.css'],
})
export class PayloadComponent implements OnInit {
  payloadData: any[] = [];
  @Input() projectId!: number;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this.projectService.getCplByProjectId(this.projectId).subscribe(
      (data) => {
        this.payloadData = data;
      },
      (error) => {
        console.error('Error loading Plane data:', error);
      },
    );
  }
}
