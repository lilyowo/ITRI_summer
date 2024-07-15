import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  simulationName: string = 'project1';
  simulationTime: string = '2024.07.11 16:04:00';
  data = {
    isInterSatelliteLink: true,
    isGroundRadiation: true,
    isRoutingPerformance: true,
    isHandoverPerformance: true
  };

  constructor() { }

  ngOnInit(): void {
  }

  onExport(format: string): void {
    // 根據 format 進行匯出處理
  }

  onEdit(): void {
    // 轉到 Edit 頁面
  }

}
