import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  hideLeft: boolean = false;
  hideProgressBar: boolean = true;
  hideRight: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  toggleRightSettings() {
    this.hideRight = !this.hideRight;
  }

  startSimulation() {
    this.hideLeft = true;
    this.hideProgressBar = false;
  }
  currentView: string = '3D View';

  handleViewChange(view: string): void {
    this.currentView = view;
  }

}
