import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-rule-switch',
  templateUrl: './rule-switch.component.html',
  styleUrls: ['./rule-switch.component.css'],
})
export class RuleSwitchComponent implements OnInit {
  dataTitle: string = '換手規則';
  ruleSwitchs: any[] = [];
  @Input() projectId!: number;
  @Input() readOnly!: boolean;
  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getSimuSettingsByProjectId(this.projectId).subscribe(
      (simuSettings) => {
        const ruleItemGroup = simuSettings[this.dataTitle];
        if (ruleItemGroup) {
          this.ruleSwitchs = ruleItemGroup;
        }
      },
      (error) => {
        console.error('Error fetching simulation settings:', error);
      },
    );
  }

  onRadioChange(item: any): void {
    this.ruleSwitchs.forEach((i: any) => (i.display = false));
    item.display = true;
    this.updateSettings();
  }

  updateSettings(): void {
    this.projectService.getSimuSettingsByProjectId(this.projectId).subscribe(
      (simuSettings) => {
        simuSettings[this.dataTitle] = this.ruleSwitchs;
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
