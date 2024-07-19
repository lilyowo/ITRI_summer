import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {}
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login() {
    const email = this.emailInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;

    this.authService.login(email, password).subscribe(
      (response) => {
        this.authService.saveToken(response.token);
        const userId = this.authService.getUserIdFromToken();
        alert(`Login Success!\nUser id=${userId}`);
        // this.router.navigate(['/projectlist']); // 註解掉這一行以防止自動跳轉
      },
      (error) => {
        console.error('Login error', error);
        alert('Login failed. Please check your credentials.');
      },
    );
  }
}
