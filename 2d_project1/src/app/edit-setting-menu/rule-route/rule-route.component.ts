import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../services/project.service';
@Component({
  selector: 'app-rule-route',
  templateUrl: './rule-route.component.html',
  styleUrls: ['./rule-route.component.css'],
})
export class RuleRouteComponent implements OnInit {
  dataTitle: string = '路由規則';
  ruleRoutes: any[] = [];
  @Input() projectId!: number;
  @Input() readOnly!: boolean;
  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getSimuSettingsByProjectId(this.projectId).subscribe(
      (simuSettings) => {
        const ruleItemGroup = simuSettings[this.dataTitle];
        if (ruleItemGroup) {
          this.ruleRoutes = ruleItemGroup;
        }
      },
      (error) => {
        console.error('Error fetching simulation settings:', error);
      },
    );
  }

  onRadioChange(item: any): void {
    this.ruleRoutes.forEach((i: any) => (i.display = false));
    item.display = true;
    this.updateSettings();
  }

  updateSettings(): void {
    this.projectService.getSimuSettingsByProjectId(this.projectId).subscribe(
      (simuSettings) => {
        simuSettings[this.dataTitle] = this.ruleRoutes;
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
