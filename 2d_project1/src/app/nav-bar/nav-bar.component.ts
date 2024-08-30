import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { SimulationService } from '../services/simulation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  pageTitle: string = '';
  userId: number = -1;
  recentReport: any = null;
  startedSimulation: boolean = false;
  constructor(
    private router: Router,
    private userService: UserService,
    private messageService: MessageService,
    private simulationService: SimulationService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.userService.updateNavBar$.subscribe(() => {
      this.updatePageTitle(this.router.url);
      if (this.userId !== -1) {
        this.loadRecentReport(this.userId);
      }
    });
    this.userId = this.userService.getUserId();
    this.startedSimulation = this.simulationService.getStartedSimulation();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updatePageTitle(this.router.url);
      }
    });
    setTimeout(() => {
      //此自動執行，for第一次生成nav-bar時用到宣告值的bug
      this.updatePageTitle(this.router.url);
    }, 500);

    if (this.userId !== -1) {
      this.loadRecentReport(this.userId);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updatePageTitle(url: string): void {
    this.startedSimulation = this.simulationService.getStartedSimulation();
    if (url.includes('/login')) {
      this.pageTitle = '登入頁面';
    } else if (url.includes('/projectlist')) {
      this.pageTitle = '星網專案管理';
    } else if (url.includes('/edit')) {
      this.pageTitle = this.startedSimulation ? '星網模擬' : '編輯星網';
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

  loadRecentReport(userId: number): void {
    this.messageService.getRecentReport(userId).subscribe(
      (report) => {
        this.recentReport = report;
      },
      (error) => {
        console.error('Error loading recent report:', error);
      },
    );
  }

  navigateToReport(reportId: number): void {
    this.router.navigate(['/report'], { queryParams: { reportId } });
  }

  logout(): void {
    this.userService.clearUserId();
    this.router.navigate(['/login']);
  }
}
