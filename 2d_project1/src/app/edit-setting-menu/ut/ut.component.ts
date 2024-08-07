import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-ut',
  templateUrl: './ut.component.html',
  styleUrls: ['./ut.component.css'],
})
export class UtComponent implements OnInit {
  @Input() projectId!: number;
  @Input() readOnly!: boolean;
  @Output() dataUpdated = new EventEmitter<void>(); // 新增 EventEmitter
  utData: any[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadUtData();
  }
  loadUtData(): void {
    this.projectService
      .getGroundStationsByProjectId(this.projectId, 0)
      .subscribe(
        (data) => {
          this.utData = data;
        },
        (error) => {
          console.error('Error loading UT data:', error);
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

    this.projectService.updateGroundStation(gsId, 0, updateData).subscribe(
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
