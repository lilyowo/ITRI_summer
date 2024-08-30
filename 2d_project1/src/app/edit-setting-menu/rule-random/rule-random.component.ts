import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../services/project.service';
@Component({
  selector: 'app-rule-random',
  templateUrl: './rule-random.component.html',
  styleUrls: ['./rule-random.component.css'],
})
export class RuleRandomComponent implements OnInit {
  dataTitle: string = '隨機事件規則';
  ruleRandoms: any[] = [];
  @Input() projectId!: number;
  @Input() readOnly!: boolean;
  constructor(private projectService: ProjectService) {}
  ngOnInit(): void {
    this.projectService.getSimuSettingsByProjectId(this.projectId).subscribe(
      (simuSettings) => {
        const ruleItemGroup = simuSettings[this.dataTitle];
        if (ruleItemGroup) {
          this.ruleRandoms = ruleItemGroup;
        }
      },
      (error) => {
        console.error('Error fetching simulation settings:', error);
      },
    );
  }

  updateSettings(field: string, item: any, event: Event): void {
    if (this.readOnly) return;

    const inputElement = event.target as HTMLInputElement;
    const updatedValue = parseFloat(inputElement.value);

    if (isNaN(updatedValue)) {
      console.error('Value must be a number:', inputElement.value);
      return;
    }

    item[field] = updatedValue;

    this.projectService.getSimuSettingsByProjectId(this.projectId).subscribe(
      (simuSettings) => {
        simuSettings[this.dataTitle] = this.ruleRandoms;
        this.projectService
          .updateSimuSettingsByProjectId(this.projectId, simuSettings)
          .subscribe(
            (response) => {
              console.log(
                'Simulation settings updated successfully:',
                response,
              );
            },
            (error) => {
              console.error('Error updating simulation settings:', error);
            },
          );
      },
      (error) => {
        console.error('Error fetching current simulation settings:', error);
      },
    );
  }
}
