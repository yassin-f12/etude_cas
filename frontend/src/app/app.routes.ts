import { Routes } from '@angular/router';
import { NewTicket } from './components/new-ticket/new-ticket';
import { TicketDetail } from './features/tickets/ticket-detail/ticket-detail';

export const routes: Routes = [
  {
    path: 'tickets/nouveau',
    component: NewTicket,
  },
  {
    path: 'tickets/:id',
    component: TicketDetail,
    title: 'Détail du ticket',
  },
  { path: '**', redirectTo: '' },
];
