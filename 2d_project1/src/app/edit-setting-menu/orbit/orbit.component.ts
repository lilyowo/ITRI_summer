import { Component, OnInit} from '@angular/core';
import { Orbit } from '../../models/orbit.model';
import { SettingsService } from '../../services/settings.service';
import { DataGroup, Settings } from '../../models/settings.model';

@Component({
  selector: 'app-orbit',
  templateUrl: './orbit.component.html',
  styleUrls: ['./orbit.component.css']
})
export class OrbitComponent implements OnInit {
  orbitData: DataGroup<Orbit> | undefined;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe((settings: Settings) => {
      const orbitGroup = settings['星網物件'].find(group => group.dataTitle === '軌道');
      this.orbitData = orbitGroup as DataGroup<Orbit>;
    });
  }
}
