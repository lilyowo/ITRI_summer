import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  pageTitle: string = '';
  userId: number = -1;
  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updatePageTitle(this.router.url);
      }
    });
    setTimeout(() => {
      //此自動執行，for第一次生成nav-bar時用到宣告值的bug
      this.updatePageTitle(this.router.url);
    }, 500);
  }

  updatePageTitle(url: string): void {
    const started_simulation = false; // 這個值應該根據你的應用邏輯來動態設置
    if (url.includes('/login')) {
      this.pageTitle = '登入頁面';
    } else if (url.includes('/projectlist')) {
      this.pageTitle = '星網專案管理';
    } else if (url.includes('/edit')) {
      this.pageTitle = started_simulation ? '星網模擬' : '編輯星網';
    } else if (url.includes('/report')) {
      this.pageTitle = '分析報告';
    } else {
      this.pageTitle = '';
    }
  }

  navigateToProjectList(): void {
    this.router.navigate(['/projectlist'], {
      queryParams: { userId: this.userId },
    });
  }
}
