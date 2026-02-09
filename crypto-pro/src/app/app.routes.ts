import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home').then(m => m.Home)
  },
  {
    path: 'list',
    loadComponent: () => import('./components/crypto-list/crypto-list').then(m => m.CryptoList)
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./components/crypto-detail/crypto-detail').then(m => m.CryptoDetail)
  },
  { path: 'contact',
    loadComponent: () => import('./components/contact/contact').then(m => m.Contact)
  },
  { path: '**', redirectTo: 'home' }
];
