import { Component, OnInit } from '@angular/core';
import { UT } from '../../models/ut.model';
import { SettingsService } from '../../services/settings.service';
import { DataGroup, Settings } from '../../models/settings.model';


@Component({
  selector: 'app-ut',
  templateUrl: './ut.component.html',
  styleUrls: ['./ut.component.css']
})
export class UtComponent implements OnInit {
  utData: DataGroup<UT> | undefined;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe((settings: Settings) => {
      const utGroup = settings['星網物件'].find(group => group.data_title === 'UT');
      this.utData = utGroup as DataGroup<UT>;
    })
  }

}
