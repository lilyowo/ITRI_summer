import { Component, OnInit, EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-right-settings',
  templateUrl: './right-settings.component.html',
  styleUrls: ['./right-settings.component.css']
})
export class RightSettingsComponent implements OnInit {
  @Output() startSimulation = new EventEmitter<void>();
  @Output() toggleRightSettings = new EventEmitter<void>();


  constructor() { }

  ngOnInit(): void {
  }
  onStartSimulation() {
    this.startSimulation.emit();
  }

  onToggleRightSettings() {
    this.toggleRightSettings.emit();
  }

}
