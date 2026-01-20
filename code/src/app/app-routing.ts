import { Routes, provideRouter, withInMemoryScrolling } from '@angular/router';

import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { AppShellComponent } from './layout/components/app-shell/app-shell.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'app',
    component: AppShellComponent,
    children: [{ path: 'dashboard', component: DashboardComponent }],
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

export function provideAppRouting() {
  return provideRouter(
    routes,
    withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
  );
}
