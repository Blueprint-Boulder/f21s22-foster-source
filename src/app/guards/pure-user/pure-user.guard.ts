import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../services/auth-service/auth.service';
import { ProfileService } from '../../services/profile-service/profile.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { environment } from '../../../environments/environment';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ToastPresets } from '../../models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class PureUserGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    private toastService: ToastService
  ) {}

  canActivate(): Observable<boolean> {
    if (!environment.useRealAuthService) {
      return of(true);
    }
    if (!this.authService.isUser()) {
      this.router.navigate(['/not-found']);
      if (this.authService.isAtLeastMod()) {
        this.toastService.info('This page is restricted to users with completed profiles.');
      }
      return of(false);
    }
    return this.profileService.currentProfileCompleted().pipe(
      tap((res) => {
        if (!res.completed) {
          this.toastService.error('You must complete your profile first.');
          this.router.navigate(['login/complete-profile']);
        }
      }),
      switchMap((res) => of(res.completed)),
      catchError((err) => of(false))
    );
  }
}
