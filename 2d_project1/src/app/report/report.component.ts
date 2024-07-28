import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  
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
