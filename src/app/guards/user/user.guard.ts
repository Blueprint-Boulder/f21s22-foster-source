import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { ProfileService } from '../../services/profile-service/profile.service';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ToastPresets } from '../../models/toast.model';
import { ToastService } from '../../services/toast-service/toast.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
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
    if (!this.authService.validUser()) {
      this.router.navigate(['login']);
      return of(false);
    }
    return this.profileService.currentProfileCompleted().pipe(
      tap((res) => {
        if (!res.completed) {
          this.toastService.show({
            body: 'You must complete your profile first.',
            preset: ToastPresets.ERROR,
          });
          this.router.navigate(['login/complete-profile']);
        }
      }),
      switchMap((res) => of(res.completed)),
      catchError((err) => of(false))
    );
  }
}
