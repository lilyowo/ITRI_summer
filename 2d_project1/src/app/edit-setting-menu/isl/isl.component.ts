import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-isl',
  templateUrl: './isl.component.html',
  styleUrls: ['./isl.component.css'],
})
export class IslComponent implements OnInit {
  islData: any[] = [];
  @Input() projectId!: number;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this.projectService.getIslByProjectId(this.projectId).subscribe(
      (data) => {
        this.islData = data;
      },
      (error) => {
        console.error('Error loading Plane data:', error);
      },
    );
  }
}
