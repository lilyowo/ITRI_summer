import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cpl-setting',
  templateUrl: './cpl-setting.component.html',
  styleUrls: ['./cpl-setting.component.css'],
})
export class CplSettingComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() uploadStart = new EventEmitter<void>();
  @Output() uploadEnd = new EventEmitter<void>();
  @Input() projectId!: number;

  AccessViewAngle: number = 0.0;
  AccessBeamAngle: number = 0.0;
  AccessBeamCount: number = 1;
  AccessBeamBandwidth: number = 0.0;

  FeederViewAngle: number = 0.0;
  FeederBeamAngle: number = 0.0;
  FeederBeamCount: number = 1;
  FeederBeamBandwidth: number = 0.0;

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {}
  closeModal() {
    this.close.emit();
  }
  cplSetting() {
    const cplSettings = {
      AccessViewAngle: this.AccessViewAngle,
      AccessBeamAngle: this.AccessBeamAngle,
      AccessBeamCount: this.AccessBeamCount,
      AccessBandwidth: this.AccessBeamBandwidth * this.AccessBeamCount,
      AccessBeamBandwidth: this.AccessBeamBandwidth,
      FeederViewAngle: this.FeederViewAngle,
      FeederBeamAngle: this.FeederBeamAngle,
      FeederBeamCount: this.FeederBeamCount,
      FeederBandwidth: this.FeederBeamBandwidth * this.FeederBeamCount,
      FeederBeamBandwidth: this.FeederBeamBandwidth,
    };
    this.uploadStart.emit();

    this.projectService
      .updateCplSettings(this.projectId, cplSettings)
      .subscribe(
        (response) => {
          console.log('CPL settings updated successfully:', response);
        },
        (error) => {
          console.error('Error updating CPL settings:', error);
        },
      );

    this.taskService.cplSetting(this.projectId, cplSettings).subscribe(
      (response) => {
        console.log('CPL settings sent successfully:', response);
        this.uploadEnd.emit();
        this.closeModal();
      },
      (error) => {
        console.error('Error sending CPL settings:', error);
      },
    );
  }
}
