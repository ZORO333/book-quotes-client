import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  {
    path: 'books',
    loadComponent: () => import('./pages/books/books').then(m => m.Books),
    canActivate: [authGuard]
  },

  {
    path: 'quotes',
    loadComponent: () => import('./pages/my-quotes/my-quotes').then(m => m.Quotes),
    canActivate: [authGuard]
  },

  { path: '', redirectTo: 'books', pathMatch: 'full' },
];
