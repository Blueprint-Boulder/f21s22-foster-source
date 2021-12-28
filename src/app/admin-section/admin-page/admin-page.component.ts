import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  public isAdmin = false;

  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.validAdmin();
  }
}
