import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.css'],
})
export class SettingsMenuComponent implements OnInit {
  @Input() projectId!: number;
  @Input() readOnly!: boolean;
  @Output() dataUpdated = new EventEmitter<void>(); // 新增 EventEmitter

  isOpen: { [key: string]: boolean } = {
    orbit: false,
    satellite: false,
    isl: false,
    payload: false,
    ut: false,
    ft: false,
    ruleRoute: false,
    ruleSwitch: false,
    ruleIsl: false,
    ruleRandom: false,
    simuSatellite: false,
    simuFloor: false,
    simuRoute: false,
    simuSwitch: false,
  };

  constructor() {}

  ngOnInit(): void {}

  toggleOpen(key: string): void {
    this.isOpen[key] = !this.isOpen[key];
  }
  handleDataUpdated(): void {
    this.dataUpdated.emit(); // 發出事件
  }
}
