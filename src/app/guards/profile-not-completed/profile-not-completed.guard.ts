import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ToastPresets } from '../../models/toast.model';
import { ProfileService } from '../../services/profile-service/profile.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { AuthService } from '../../services/auth-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileNotCompletedGuard implements CanActivate {
  constructor(
    private profileService: ProfileService,
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService
  ) {}

  // Must be logged in + not have completed profile yet.
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (!environment.useRealAuthService) {
      return of(true);
    }
    if (!this.authService.validUser()) {
      this.router.navigate(['login']);
      return of(false);
    }
    return this.profileService.currentProfileCompleted().pipe(
      tap((res) => {
        if (res.completed) {
          this.toastService.show({
            body: 'Profile already completed.',
            preset: ToastPresets.ERROR,
          });
          this.router.navigate(['/respite']);
        }
      }),
      switchMap((res) => of(!res.completed)),
      catchError((err) => of(false))
    );
  }
}