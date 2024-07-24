import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginHistoryService } from '../services/login-history.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {}
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  showModal = false;
  constructor(
    private authService: AuthService,
    private loginHistoryService: LoginHistoryService,
    private router: Router,
    private userService: UserService
  ) {}

  login() {
    const email = this.emailInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;
    // this.router.navigate(['/projectlist']);
    this.authService.login(email, password).subscribe(
      (response) => {
        this.authService.saveToken(response.token);
        const userId = this.authService.getUserIdFromToken();
        alert(`Login Success!\nUser id=${userId}`);
        // this.router.navigate(['/projectlist']); // 註解掉這一行以防止自動跳轉

        // 記錄登入歷史
        if (userId) {
          this.userService.setUserId(userId);
          this.loginHistoryService.recordLogin(userId).subscribe(
            () => {
              console.log('Login history recorded successfully');
            },
            (error) => {
              console.error('Error recording login history', error);
            },
          );
        }
        // 導航到 /projectlist 並傳遞 userId 作為 queryParams
        this.router.navigate(['/projectlist'], {
          queryParams: { userId: userId },
        });
      },
      (error) => {
        console.error('Login error', error);
        alert('Login failed. Please check your credentials.');
      },
    );
  }
  toggleModal() {
    this.showModal = !this.showModal;
  }
}
