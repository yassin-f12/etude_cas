import { Routes } from '@angular/router';
import { TicketDetail } from './features/tickets/ticket-detail/ticket-detail';

export const routes: Routes = [
  {
    path: 'tickets/:id',
    component: TicketDetail,
    title: 'Détail du ticket',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
