import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Ticket } from '../model/ticket';
import { Comment } from '../model/comment';

export type TicketDraft = Omit<Ticket, 'id'>;
export type CommentDraft = Omit<Comment, 'id'>;

const TICKETS_URL = '/api/tickets';
const COMMENTS_URL = '/api/comments';

@Service()
export class TicketApi {
  private readonly http = inject(HttpClient);

  getTickets(filters?: {
    status?: string;
    priority?: string;
    query?: string;
  }): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(TICKETS_URL, {
      params: {
        ...(filters?.status && { status: filters.status }),
        ...(filters?.priority && { priority: filters.priority }),
        ...(filters?.query && { query: filters.query }),
      },
    });
  }

  getById(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${TICKETS_URL}/${id}`, {
      params: { _embed: 'comments' },
    });
  }

  create(draft: TicketDraft): Observable<Ticket> {
    return this.http.post<Ticket>(TICKETS_URL, draft);
  }

  update(id: number, changes: Partial<Ticket>): Observable<Ticket> {
    return this.http.patch<Ticket>(`${TICKETS_URL}/${id}`, changes);
  }

  getComments(ticketId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(COMMENTS_URL, {
      params: {
        ticketId,
        _sort: 'createdAt',
      },
    });
  }

  addComment(draft: CommentDraft): Observable<Comment> {
    return this.http.post<Comment>(COMMENTS_URL, draft);
  }
}
