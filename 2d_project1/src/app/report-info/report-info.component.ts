import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartService } from '../services/chart.service';

@Component({
  selector: 'app-report-info',
  templateUrl: './report-info.component.html',
  styleUrls: ['./report-info.component.css'],
})
export class ReportInfoComponent implements OnInit {
  reportId!: number;
  charts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private chartService: ChartService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.reportId = params['reportId'];
      this.loadCharts(this.reportId);
    });
  }
  loadCharts(reportId: number): void {
    this.chartService.getChartsByReportId(reportId).subscribe((data) => {
      this.charts = data;
    });
  }

  getImage(imageData: any): string {
    if (!imageData || !imageData.data || !Array.isArray(imageData.data)) {
      // 如果 imageData 为空或者格式不正确，返回占位符
      return (
        'data:image/svg+xml;base64,' +
        btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
          <rect width="100%" height="100%" fill="#ccc" />
          <text x="50%" y="50%" fill="#000" font-size="20" text-anchor="middle" alignment-baseline="middle">
            no image
          </text>
        </svg>
      `)
      );
    }

    // 否则，正常转换图像数据
    const base64String = btoa(
      new Uint8Array(imageData.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        '',
      ),
    );
    return `data:image/jpeg;base64,${base64String}`;
  }
}
