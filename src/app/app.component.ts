import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'f21s22-foster-source';
  bugModalOpen = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (localStorage.getItem('rememberUser') === 'true') {
      this.authService.init();
    } else {
      this.authService.logout();
    }
  }

  launchBugModal(): void {
    this.bugModalOpen = true;
  }

  closeBugModal(): void {
    this.bugModalOpen = false;
  }
}
