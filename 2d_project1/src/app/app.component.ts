import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = '2d_project1';
  showNavBar = false;
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkNavBarVisibility(event.urlAfterRedirects);
      }
    });
  }
  ngOnInit() {
    this.checkNavBarVisibility(this.router.url);
  }
  private checkNavBarVisibility(url: string): void {
    this.showNavBar = !url.includes('/login');
  }
}
