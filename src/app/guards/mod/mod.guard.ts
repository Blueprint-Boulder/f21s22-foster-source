import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ModGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    if (environment.useRealAuthService) {
      if (!this.authService.isAtLeastMod()) {
        this.router.navigate(['login']);
        return false;
      }
      return true;
    } else {
      return true;
    }
  }
}
