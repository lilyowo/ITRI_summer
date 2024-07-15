import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-left-tools',
  templateUrl: './left-tools.component.html',
  styleUrls: ['./left-tools.component.css']
})
export class LeftToolsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  handleButtonClick(toolName: string): void {
    alert(`${toolName} clicked`);
  }

}
