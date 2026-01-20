import { Routes, provideRouter, withInMemoryScrolling } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { AppShellComponent } from './layout/components/app-shell/app-shell.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'app',
    component: AppShellComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ],
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
