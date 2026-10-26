import { Routes } from '@angular/router';
import { NewTicket } from './components/new-ticket/new-ticket';

export const routes: Routes = [
  {
    path: 'tickets/nouveau',
    component: NewTicket,
  },
  { path: '**', redirectTo: '' },
];
