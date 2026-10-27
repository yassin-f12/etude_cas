import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketApi } from '../../../core/ticket-api';
import { Ticket } from '../../../model/ticket';
import { Comment } from '../../../model/comment';
import { DatePipe } from '@angular/common';
import { CommentForm } from '../comment-form/comment-form';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket-detail',
  imports: [DatePipe, CommentForm, FormsModule],
  templateUrl: './ticket-detail.html',
  styleUrl: './ticket-detail.css',
})
export class TicketDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(TicketApi);

  protected readonly ticket = signal<Ticket | null>(null);
  protected readonly comments = signal<Comment[]>([]);
  protected readonly error = signal('');
  protected readonly loading = signal(true);
  protected readonly commentsLoading = signal(true);

  protected nextStatuses(): Ticket['status'][] {
    const currentTicket = this.ticket();

    if (!currentTicket) {
      return [];
    }

    switch (currentTicket.status) {
      case 'open':
        return ['in-progress', 'closed'];

      case 'in-progress':
        return ['open', 'closed'];

      case 'closed':
        return ['open'];

      default:
        return [];
    }
  }

  protected canChangeStatus(): boolean {
    return this.nextStatuses().length > 0;
  }

  protected canAddComment(): boolean {
    const currentTicket = this.ticket();

    return currentTicket !== null && currentTicket.status !== 'closed';
  }

  protected changeStatus(status: Ticket['status']): void {
    const currentTicket = this.ticket();

    if (!currentTicket || !this.canChangeStatus()) {
      return;
    }

    if (!this.nextStatuses().includes(status)) {
      this.error.set('Cette transition de statut est interdite.');
      return;
    }

    this.error.set('');

    this.api.update(currentTicket.id, { status }).subscribe({
      next: (updatedTicket) => {
        this.ticket.set(updatedTicket);
      },
      error: () => {
        this.error.set('Impossible de modifier le statut du ticket.');
      },
    });
  }

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(id) || id <= 0) {
      this.error.set('Identifiant de ticket invalide.');
      return;
    }

    this.api.getById(id).subscribe({
      next: (ticket) => {
        this.ticket.set(ticket);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Impossible de récupérer ce ticket.');
        this.loading.set(false);
      },
    });

    this.api.getComments(id).subscribe({
      next: (comments) => {
        this.comments.set(comments);
        this.commentsLoading.set(false);
      },
      error: () => {
        this.error.set('Impossible de récupérer les commentaires.');
        this.commentsLoading.set(false);
      },
    });
  }
}
