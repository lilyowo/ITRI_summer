import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-simu-satellite',
  templateUrl: './simu-satellite.component.html',
  styleUrls: ['./simu-satellite.component.css'],
})
export class SimuSatelliteComponent implements OnInit {
  dataTitle: string = '衛星間連線';
  dataGroup: any[] = [];
  @Input() projectId!: number;
  @Input() readOnly!: boolean;
  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getSimuItemsByProjectId(this.projectId).subscribe(
      (simuItems) => {
        const ruleItemGroup = simuItems[this.dataTitle];
        if (ruleItemGroup) {
          this.dataGroup = ruleItemGroup;
        }
      },
      (error) => {
        console.error('Error fetching simulation items:', error);
      },
    );
  }
  onCheckboxChange(item: any): void {
    item.display = !item.display;
    this.updateSettings();
  }

  updateSettings(): void {
    this.projectService.getSimuItemsByProjectId(this.projectId).subscribe(
      (simuItems) => {
        simuItems[this.dataTitle] = this.dataGroup;
        this.projectService
          .updateSimuItemsByProjectId(this.projectId, simuItems)
          .subscribe(
            (response) => {
              console.log('Simulation items updated successfully:', response);
            },
            (error) => {
              console.error('Error updating simulation items:', error);
            },
          );
      },
      (error) => {
        console.error('Error fetching simulation items:', error);
      },
    );
  }
}
