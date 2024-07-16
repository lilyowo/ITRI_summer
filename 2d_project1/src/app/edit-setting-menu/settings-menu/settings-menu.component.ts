import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ OrbitComponent } from '../orbit/orbit.component';
import{ SatelliteComponent } from '../satellite/satellite.component';
import { IslComponent } from '../isl/isl.component';
import { PayloadComponent } from '../payload/payload.component';
import { UtComponent } from '../ut/ut.component';
import { FtComponent } from '../ft/ft.component';
import { RuleRouteComponent } from '../rule-route/rule-route.component';
import { RuleSwitchComponent } from '../rule-switch/rule-switch.component';
import { RuleIslComponent } from '../rule-isl/rule-isl.component';
import { RuleRandomComponent } from '../rule-random/rule-random.component';

interface SettingItem {
  data_title: string;
  open: boolean;
  content?: string;
}

interface Settings {
  [key: string]: SettingItem[];
}

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.css']
})
export class SettingsMenuComponent implements OnInit {

  settings: Settings = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Settings>('assets/setting_item.json').subscribe(data => {
      this.settings = data;
      // Initialize open property for each setting item
      for (const key in this.settings) {
        if (this.settings.hasOwnProperty(key)) {
          this.settings[key].forEach(item => item.open = false);
        }
      }
    });
  }

  toggleOpen(category: string, item: SettingItem): void {
    item.open = !item.open;
  }

  getComponent(dataTitle: string): any {
    switch (dataTitle) {
      case '軌道':
        return OrbitComponent;
      case '衛星':
        return SatelliteComponent;
      case 'ISL':
        return IslComponent;
      case '通訊酬載':
        return PayloadComponent;
      case 'UT':
        return UtComponent;
      case 'FT':
        return FtComponent;
      case '路由規則':
        return RuleRouteComponent;
      case '換手規則':
        return RuleSwitchComponent;
      case 'ISL連線規則':
        return RuleIslComponent;
      case '隨機事件規則':
        return RuleRandomComponent;
      default:
        return null;
    }
  }

}