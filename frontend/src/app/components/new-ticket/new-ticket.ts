import { Component, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { TicketApi, TicketDraft } from '../../core/ticket-api';
import {
  FormField,
  FormRoot,
  email,
  form,
  required,
  minLength,
  maxLength,
} from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { apiErrorMessage } from '../../api/api-error';

const EMPTY_DRAFT: TicketDraft = {
  title: '',
  description: '',
  category: 'materiel',
  priority: 'normal',
  status: 'open',
  requester: '',
  assignee: null,
  createdAt: new Date().toISOString(),
};

@Component({
  imports: [FormField, FormRoot, MatButton, RouterLink],
  selector: 'app-new-ticket',
  styleUrl: './new-ticket.css',
  templateUrl: './new-ticket.html',
})
export class NewTicket {
  private readonly api = inject(TicketApi);
  private readonly router = inject(Router);
  protected readonly serverError = signal('');
  protected readonly saved = signal(false);
  protected readonly submitAttempted = signal(false);

  private readonly draft = signal<TicketDraft>({ ...EMPTY_DRAFT });

  protected readonly ticketForm = form(
    this.draft,
    (path) => {
      required(path.title, { message: 'Le titre est obligatoire.' });
      minLength(path.title, 5, {
        message: 'Le titre doit contenir au moins 5 caractères.',
      });
      maxLength(path.title, 80, {
        message: 'Le titre ne doit pas dépasser 80 caractères.',
      });

      required(path.description, {
        message: 'La description est obligatoire.',
      });
      minLength(path.description, 20, {
        message: 'La description doit contenir au moins 20 caractères.',
      });

      required(path.category, { message: 'La catégorie est obligatoire.' });
      required(path.priority, { message: 'La priorité est obligatoire.' });

      required(path.requester, { message: "L'e-mail est obligatoire." });
      email(path.requester, { message: "L'adresse e-mail n'est pas valide." });
    },
    {
      submission: {
        action: async () => this.save(),
      },
    },
  );

  protected async save(): Promise<void> {
    const draft = this.draft();

    try {
      const ticket = await firstValueFrom(this.api.create(draft));
      this.resetForm();
      await this.router.navigate(['/tickets', ticket.id]);
    } catch (error) {
      this.serverError.set(apiErrorMessage(error));
      return undefined;
    }
  }

  protected resetForm(): void {
    this.saved.set(false);
    this.submitAttempted.set(false);
    this.ticketForm().reset({ ...EMPTY_DRAFT });
  }
}
