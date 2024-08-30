import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-rule-isl',
  templateUrl: './rule-isl.component.html',
  styleUrls: ['./rule-isl.component.css'],
})
export class RuleIslComponent implements OnInit {
  dataTitle: string = 'ISL連線規則';
  ruleIsls: any[] = [];
  @Input() projectId!: number;
  @Input() readOnly!: boolean;
  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getSimuSettingsByProjectId(this.projectId).subscribe(
      (simuSettings) => {
        const ruleItemGroup = simuSettings[this.dataTitle];
        if (ruleItemGroup) {
          this.ruleIsls = ruleItemGroup;
        }
      },
      (error) => {
        console.error('Error fetching simulation settings:', error);
      },
    );
  }

  onRadioChange(item: any): void {
    this.ruleIsls.forEach((i: any) => (i.display = false));
    item.display = true;
    this.updateSettings();
  }

  updateSettings(): void {
    this.projectService.getSimuSettingsByProjectId(this.projectId).subscribe(
      (simuSettings) => {
        simuSettings[this.dataTitle] = this.ruleIsls;
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
        console.error('Error fetching simulation settings:', error);
      },
    );
  }
}
