import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartService } from '../services/chart.service';

@Component({
  selector: 'app-report-info',
  templateUrl: './report-info.component.html',
  styleUrls: ['./report-info.component.css']
})
export class ReportInfoComponent implements OnInit {
  reportId!: number;
  charts: any[] = [];
  
  constructor(private route: ActivatedRoute, private chartService: ChartService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.reportId = params['reportId'];
      this.loadCharts(this.reportId);
    });
  }
  loadCharts(reportId: number): void {
    this.chartService.getChartsByReportId(reportId).subscribe(data => {
      this.charts = data;
    });
  }

  getImage(imageData: any): string {
    const base64String = btoa(new Uint8Array(imageData.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
    return `data:image/jpeg;base64,${base64String}`;
  }

}
