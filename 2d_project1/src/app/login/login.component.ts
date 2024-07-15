import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  login() {
    // 實際情況下你可能需要在這裡添加驗證邏輯
    this.router.navigate(['/projectlist']);
  }
  ngOnInit(): void {
  }

}
