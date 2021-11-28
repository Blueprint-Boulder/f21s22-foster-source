import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { AdminGuard } from './guards/admin/admin.guard';

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
    path: 'admin',
<<<<<<< HEAD
    loadChildren: () =>
      import('./admin-section/admin-section.module').then(
        (m) => m.AdminSectionModule
      ),
    canActivate: [AdminGuard],
=======
    loadChildren: () => import('./admin-section/admin-section.module').then((m) => m.AdminSectionModule),
>>>>>>> 3f16f5c15f14f6df99484c145a2c4ad991933174
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
