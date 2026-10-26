import { Service, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Ticket } from '../model/ticket';
import { Comment } from '../model/comment';

@Service()
export class TicketApi {
  private readonly http = inject(HttpClient);

  private readonly ticketsUrl = '/api/tickets';
  private readonly commentsUrl = '/api/comments';

  getTickets(filters?: {
    status?: string;
    priority?: string;
    query?: string;
  }): Observable<Ticket[]> {
    let params = new HttpParams();

    if (filters?.status) {
      params = params.set('status', filters.status);
    }

    if (filters?.priority) {
      params = params.set('priority', filters.priority);
    }

    if (filters?.query) {
      params = params.set('query', filters.query);
    }

    return this.http.get<Ticket[]>(this.ticketsUrl, { params });
  }

  getTicketById(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.ticketsUrl}/${id}`, {
      params: new HttpParams().set('_embed', 'comments'),
    });
  }

  createTicket(ticket: Omit<Ticket, 'id'>): Observable<Ticket> {
    return this.http.post<Ticket>(this.ticketsUrl, ticket);
  }

  updateTicket(id: number, changes: Partial<Ticket>): Observable<Ticket> {
    return this.http.patch<Ticket>(`${this.ticketsUrl}/${id}`, changes);
  }

  getComments(ticketId: number): Observable<Comment[]> {
    const params = new HttpParams().set('ticketId', ticketId).set('_sort', 'createdAt');

    return this.http.get<Comment[]>(this.commentsUrl, { params });
  }

  addComment(comment: Omit<Comment, 'id'>): Observable<Comment> {
    return this.http.post<Comment>(this.commentsUrl, comment);
  }
}
