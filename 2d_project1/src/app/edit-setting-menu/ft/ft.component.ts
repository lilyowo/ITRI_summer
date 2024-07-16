import { Component, OnInit } from '@angular/core';
import { FT } from '../../models/ft.model';
import { SettingsService } from '../../services/settings.service';
import { DataGroup, Settings } from '../../models/settings.model';


@Component({
  selector: 'app-ft',
  templateUrl: './ft.component.html',
  styleUrls: ['./ft.component.css']
})
export class FtComponent implements OnInit {
  ftData: DataGroup<FT> | undefined;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe((settings: Settings) => {
      const ftGroup = settings['星網物件'].find(group => group.data_title === 'FT');
      this.ftData = ftGroup as DataGroup<FT>;
    })
  }

}
