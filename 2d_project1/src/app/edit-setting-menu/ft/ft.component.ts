import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-ft',
  templateUrl: './ft.component.html',
  styleUrls: ['./ft.component.css'],
})
export class FtComponent implements OnInit {
  @Input() projectId!: number;
  @Input() readOnly!: boolean;
  @Output() dataUpdated = new EventEmitter<void>(); // 新增 EventEmitter
  ftData: any[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadFtData();
  }
  loadFtData(): void {
    this.projectService
      .getGroundStationsByProjectId(this.projectId, 1)
      .subscribe(
        (data) => {
          this.ftData = data;
        },
        (error) => {
          console.error('Error loading FT data:', error);
        },
      );
  }

  updateGroundStation(gsId: number, field: string, event: Event): void {
    if (this.readOnly) return;

    const inputElement = event.target as HTMLInputElement;
    const updatedValue = parseFloat(inputElement.value);

    if (isNaN(updatedValue)) {
      console.error('Value must be a number:', inputElement.value);
      return;
    }

    const updateData = { [field]: updatedValue };

    this.projectService.updateGroundStation(gsId, 1, updateData).subscribe(
      () => {
        console.log('GroundStation updated successfully.');
        this.dataUpdated.emit(); // 發出事件
      },
      (error) => {
        console.error('Error updating GroundStation:', error);
      },
    );
  }
}
