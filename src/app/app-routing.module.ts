import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { AdminGuard } from './guards/admin/admin.guard';
import { ModGuard } from './guards/mod/mod.guard';
import { UserGuard } from './guards/user/user.guard';
import { LoggedInGuard } from './guards/logged-in/logged-in.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-section/admin-section.module').then((m) => m.AdminSectionModule),
    canActivate: [ModGuard],
  },
  {
    path: 'respite',
    loadChildren: () => import('./respite-search/respite-search.module').then((m) => m.RespiteSearchModule),
    canActivate: [UserGuard],
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then((m) => m.AccountModule),
    canActivate: [LoggedInGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
