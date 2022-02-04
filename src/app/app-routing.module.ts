import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { LoggedInGuard } from './guards/logged-in/logged-in.guard';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './guards/user/user.guard';
import { ModGuard } from './guards/mod/mod.guard';
import { NgModule } from '@angular/core';

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
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    canActivate: [LoggedInGuard],
  },
  {
    path: 'forum',
    loadChildren: () => import('./forum/forum.module').then((m) => m.ForumModule),
    canActivate: [],
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
