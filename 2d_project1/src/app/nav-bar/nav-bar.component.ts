import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  pageTitle: string ='';
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updatePageTitle(this.router.url);
      }
    });
    setTimeout(() => { //此自動執行，for第一次生成nav-bar時用到宣告值的bug
      this.updatePageTitle(this.router.url);
    }, 500);
  }
  
  updatePageTitle(url: string): void {
    const started_simulation = false; // 這個值應該根據你的應用邏輯來動態設置
    if (url.endsWith('/login')) {
      this.pageTitle = '登入頁面';
    } else if (url.endsWith('/projectlist')) {
      this.pageTitle = '星網專案管理';
    } else if (url.endsWith('/edit')) {      
      this.pageTitle = started_simulation ? '星網模擬' : '編輯星網';
    } else if (url.endsWith('/report')) {
      this.pageTitle = '分析報告';
    } else {
      this.pageTitle = '';
    }
  }

}
