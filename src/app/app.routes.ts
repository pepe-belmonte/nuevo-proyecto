import { Routes } from '@angular/router';
import { AccessGuard } from './shared/guard/access.guard';

export const routes: Routes = [
      {
    path: '',
    loadComponent: () =>
    import('./home/presentation/home-view/home-view.component').then(
      (m) => m.HomeViewComponent
    ),
    canActivate: [AccessGuard]
  },
  { path: 'home', redirectTo: '/', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
    import('./login/presentation/login-view/login-view.component').then(
      (m) => m.LoginViewComponent
    )
  },
];
