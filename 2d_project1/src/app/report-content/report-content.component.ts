import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-report-content',
  templateUrl: './report-content.component.html',
  styleUrls: ['./report-content.component.css']
})
export class ReportContentComponent implements OnInit {
  reportData: any;
  // backendData: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadReportData();
    // this.fetchBackendData();
  }

  loadReportData(): void {
    this.http.get('/assets/report_data.json').subscribe(data => {
      this.reportData = data;
    });
  }


  getCategories(): string[] {
    // console.log(this.reportData);
    return Object.keys(this.reportData);
  }
  
}


  // fetchBackendData(): void {
  //   // 發送請求到後端獲取數據
  //   this.http.get('/api/backend-data').subscribe(data => {
  //     this.backendData = data;
  //     this.backendData = {
  //       "satellite_id": "123",
  //       "min_dis": "50",
  //       "satellite_num": "10",
  //       "avg_dis": "100",
  //       "latitude_range": "0-10",
  //       "coverage_time": "120",
  //       "max_hop": "5",
  //       "avg_hop": "3",
  //       "ground_station_id": "GS-01",
  //       "handover_count": "15"
  //     }
      
  //     this.populateData();
  //   });
  // }

  // populateData(): void {
  //   if (this.reportData && this.backendData) {
  //     for (let category in this.reportData) {
  //       this.reportData[category].forEach((item: any) => {
  //         if (item.display) {
  //           item.content = this.replacePlaceholders(item.content, this.backendData);
  //         }
  //       });
  //     }
  //   }
  // }

  // replacePlaceholders(content: string, data: any): string {
  //   return content.replace(/{{(\w+)}}/g, (_, key) => data[key] || '');
  // }
