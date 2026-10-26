import { Ticket, TicketStatus } from '../model/ticket';

const PRIORITY_ORDER = {
  urgent: 0,
  high: 1,
  normal: 2,
  low: 3,
} as const;

export function nextStatuses(status: TicketStatus): TicketStatus[] {
  const transitions: Record<TicketStatus, TicketStatus[]> = {
    open: ['in-progress'],
    'in-progress': ['resolved'],
    resolved: ['closed', 'in-progress'],
    closed: [],
  };

  return transitions[status];
}

export function compareTickets(a: Ticket, b: Ticket): number {
  const priorityDifference = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];

  if (priorityDifference !== 0) {
    return priorityDifference;
  }

  return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
}

export function isStale(ticket: Ticket, now: Date = new Date()): boolean {
  if (ticket.status !== 'open' && ticket.status !== 'in-progress') {
    return false;
  }

  const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
  const ageInMs = now.getTime() - new Date(ticket.createdAt).getTime();

  return ageInMs > threeDaysInMs;
}

export function canAddComment(status: TicketStatus): boolean {
  return status !== 'closed';
}
