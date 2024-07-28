import { Component, OnInit } from '@angular/core';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  charts: any[] = [];

  constructor(private testService: TestService) { }

  ngOnInit(): void {
    this.testService.getCharts().subscribe(data => {
      this.charts = data;
    });
  }

  getImage(imageData: any): string {
    const base64String = btoa(new Uint8Array(imageData.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
    return `data:image/jpeg;base64,${base64String}`;
  }

}
