import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartService } from '../services/chart.service';
import { ExportService } from '../services/export.service';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-report-title',
  templateUrl: './report-title.component.html',
  styleUrls: ['./report-title.component.css'],
})
export class ReportTitleComponent implements OnInit {
  reportId!: number;
  reportTitle: any[] = [];
  @Output() export: EventEmitter<string> = new EventEmitter();
  @Output() edit: EventEmitter<void> = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private chartService: ChartService,
    private exportService: ExportService,
  ) {}
  showExportMenu: boolean = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.reportId = params['reportId'];
      this.chartService
        .getReportTitleByReportId(this.reportId)
        .subscribe((data) => {
          this.reportTitle = data;
        });
    });
  }

  onExportClick(): void {
    this.showExportMenu = !this.showExportMenu;
  }

  exportAs(format: string): void {
    const reportName = this.reportTitle[0]?.reportName || 'report';
    const simuTime = this.reportTitle[0]?.simuTime
      ? new Date(this.reportTitle[0].simuTime).toISOString()
      : 'unknown_time';
    const fileName = `Simulation_${reportName}_${simuTime}`;
    if (format === 'pdf') {
      // 利用window.print()方法來列印PDF
      window.print();
    } else if (format === 'word') {
      this.exportService
        .exportReport(this.reportId, format)
        .subscribe((blob) => {
          saveAs(blob, `${fileName}.docx`);
        });
    } else if (format === 'excel') {
      this.exportService
        .exportReport(this.reportId, 'csv')
        .subscribe((blob) => {
          saveAs(blob, `${fileName}.csv`);
        });
    }
  }
}
