import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-left-tools',
  templateUrl: './left-tools.component.html',
  styleUrls: ['./left-tools.component.css']
})
export class LeftToolsComponent implements OnInit {
  showModal = false;
  constructor() { }

  ngOnInit(): void {
  }
  
  handleButtonClick(toolName: string): void {
    alert(`${toolName} clicked`);
  }
  toggleModal() {
    this.showModal = !this.showModal;
  }

}
