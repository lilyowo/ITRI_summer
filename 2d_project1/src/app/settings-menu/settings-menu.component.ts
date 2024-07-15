import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

}
