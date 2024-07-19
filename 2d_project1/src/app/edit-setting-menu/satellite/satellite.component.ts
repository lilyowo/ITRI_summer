import { Component, OnInit } from '@angular/core';
import { Satellite } from '../../models/satellite.model';
import { SettingsService } from '../../services/settings.service';
import { DataGroup, Settings } from '../../models/settings.model';


@Component({
  selector: 'app-satellite',
  templateUrl: './satellite.component.html',
  styleUrls: ['./satellite.component.css']
})
export class SatelliteComponent implements OnInit {
  satelliteData: DataGroup<Satellite> | undefined;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe((settings: Settings)=> {
      const satelliteGroup = settings['星網物件'].find(group => group.dataTitle=== '衛星');
      this.satelliteData = satelliteGroup as DataGroup<Satellite>;
    })
  }

}
