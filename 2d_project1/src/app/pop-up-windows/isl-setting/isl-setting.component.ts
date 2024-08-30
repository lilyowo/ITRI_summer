import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-isl-setting',
  templateUrl: './isl-setting.component.html',
  styleUrls: ['./isl-setting.component.css'],
})
export class IslSettingComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() uploadStart = new EventEmitter<void>();
  @Output() uploadEnd = new EventEmitter<void>();
  @Input() projectId!: number;
  satAzimuth1: number = 0.0;
  satAzimuth2: number = 90.0;
  satAzimuth3: number = 180.0;
  satAzimuth4: number = 270.0;
  satElevation: number = 0.0;
  laserAzimuth: number = 0.0;
  laserElevation: number = 0.0;
  laserRange: number = 0.0;

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.close.emit();
  }

  islSetting() {
    const islSettings = {
      satAzimuth1: this.satAzimuth1,
      satAzimuth2: this.satAzimuth2,
      satAzimuth3: this.satAzimuth3,
      satAzimuth4: this.satAzimuth4,
      satElevation: this.satElevation,
      laserAzimuth: this.laserAzimuth,
      laserElevation: this.laserElevation,
      laserRange: this.laserRange,
    };

    console.log(islSettings);
    this.uploadStart.emit(); // 開始上傳，觸發loading狀態

    this.taskService
      .islSetting(this.projectId, islSettings)
      .pipe(
        switchMap((taskResponse) => {
          console.log('Task service successful:', taskResponse);
          // 在這裡返回 projectService 的 Observable
          return this.projectService.updateIslSettings(
            this.projectId,
            islSettings,
          );
        }),
      )
      .subscribe(
        (projectResponse) => {
          console.log('Project service successful:', projectResponse);
          this.uploadEnd.emit(); // 所有操作完成後發出結束事件
          this.closeModal();
        },
        (error) => {
          console.error('Error in islSetting:', error);
          this.uploadEnd.emit(); // 即使出錯也發出結束事件
        },
      );
  }
}
