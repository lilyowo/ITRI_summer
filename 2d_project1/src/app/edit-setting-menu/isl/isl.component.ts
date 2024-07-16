import { Component, OnInit } from '@angular/core';
import { ISL } from '../../models/isl.model';
import { SettingsService } from '../../services/settings.service';
import { DataGroup, Settings } from '../../models/settings.model';




@Component({
  selector: 'app-isl',
  templateUrl: './isl.component.html',
  styleUrls: ['./isl.component.css']
})
export class IslComponent implements OnInit {
  islData: DataGroup<ISL> | undefined;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe((settings: Settings) => {
      const islGroup = settings['星網物件'].find(group => group.data_title === 'ISL');
      this.islData = islGroup as DataGroup<ISL>;
    })
  }

}
