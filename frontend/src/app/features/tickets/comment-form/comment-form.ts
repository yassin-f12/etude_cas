import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TicketApi } from '../../../core/ticket-api';
import { Comment } from '../../../model/comment';

@Component({
  selector: 'app-comment-form',
  imports: [FormsModule],
  templateUrl: './comment-form.html',
})
export class CommentForm {
  private readonly api = inject(TicketApi);

  readonly ticketId = input.required<number>();
  readonly commentAdded = output<Comment>();

  author = '';
  body = '';
  protected readonly error = signal('');
  protected readonly submitting = signal(false);
  protected readonly success = signal('');

  submitComment(): void {
    const author = this.author.trim();
    const body = this.body.trim();

    if (!author || !body || this.submitting()) {
      return;
    }

    this.error.set('');
    this.success.set('');
    this.submitting.set(true);

    this.api
      .addComment({
        ticketId: this.ticketId(),
        author,
        body,
      })
      .subscribe({
        next: (comment) => {
          this.commentAdded.emit(comment);
          this.author = '';
          this.body = '';
          this.success.set('Commentaire ajouté avec succès.');
          this.submitting.set(false);
        },
        error: () => {
          this.error.set("Impossible d'ajouter le commentaire. Réessayer");
          this.submitting.set(false);
        },
      });
  }
}
