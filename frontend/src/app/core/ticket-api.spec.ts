import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { TicketApi } from './ticket-api';
import { Ticket } from '../model/ticket';
import { Comment } from '../model/comment';

describe('TicketApi', () => {
  let service: TicketApi;
  let httpTesting: HttpTestingController;

  const ticket: Ticket = {
    id: 1,
    title: 'Impossible de se connecter au Wi-Fi invité',
    description: 'Depuis ce matin, le réseau invité refuse toutes les connexions des stagiaires.',
    category: 'reseau',
    priority: 'urgent',
    status: 'in-progress',
    requester: 'nadia.benali@campus-lyon.fr',
    assignee: 'Karim Diallo',
    createdAt: '2026-10-25T08:42:00.000Z',
  };

  const comment: Comment = {
    id: 1,
    ticketId: 1,
    author: 'Karim Diallo',
    body: 'Je vérifie la configuration du réseau.',
    createdAt: '2026-10-25T09:00:00.000Z',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketApi, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(TicketApi);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('devrait récupérer les tickets avec les filtres', () => {
    service
      .getTickets({ status: 'open', priority: 'urgent', query: 'wifi' })
      .subscribe((tickets) => {
        expect(tickets).toEqual([ticket]);
      });

    const req = httpTesting.expectOne(
      (request) =>
        request.url === '/api/tickets' &&
        request.params.get('status') === 'open' &&
        request.params.get('priority') === 'urgent' &&
        request.params.get('query') === 'wifi',
    );

    expect(req.request.method).toBe('GET');
    req.flush([ticket]);
  });

  it('devrait récupérer un ticket par son identifiant', () => {
    service.getById(1).subscribe((result) => {
      expect(result).toEqual(ticket);
    });

    const req = httpTesting.expectOne(
      (request) => request.url === '/api/tickets/1' && request.params.get('_embed') === 'comments',
    );

    expect(req.request.method).toBe('GET');
    req.flush(ticket);
  });

  it('devrait créer un ticket', () => {
    const { id: _id, ...draft } = ticket;

    service.create(draft).subscribe((result) => {
      expect(result).toEqual(ticket);
    });

    const req = httpTesting.expectOne('/api/tickets');

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(draft);
    req.flush(ticket);
  });

  it('devrait modifier un ticket', () => {
    service.update(1, { status: 'resolved' }).subscribe((result) => {
      expect(result.status).toBe('resolved');
    });

    const req = httpTesting.expectOne('/api/tickets/1');

    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ status: 'resolved' });
    req.flush({ ...ticket, status: 'resolved' });
  });

  it('devrait récupérer les commentaires triés par date', () => {
    service.getComments(1).subscribe((result) => {
      expect(result).toEqual([comment]);
    });

    const req = httpTesting.expectOne(
      (request) =>
        request.url === '/api/comments' &&
        request.params.get('ticketId') === '1' &&
        request.params.get('_sort') === 'createdAt',
    );

    expect(req.request.method).toBe('GET');
    req.flush([comment]);
  });

  it('devrait ajouter un commentaire', () => {
    const { id: _id, ...draft } = comment;

    service.addComment(draft).subscribe((result) => {
      expect(result).toEqual(comment);
    });

    const req = httpTesting.expectOne('/api/comments');

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(draft);
    req.flush(comment);
  });
});
