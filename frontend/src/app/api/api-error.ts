import { HttpErrorResponse } from '@angular/common/http';

export function apiErrorMessage(error: unknown): string {
  if (!(error instanceof HttpErrorResponse)) {
    return 'Une erreur inattendue est survenue.';
  }
  if ([0, 502, 503, 504].includes(error.status)) {
    return "Le serveur est injoignable. Vérifiez que l'API est lancée.";
  }
  const message: unknown = error.error?.message;
  if (Array.isArray(message)) {
    return message.join(' ');
  }
  if (typeof message === 'string') {
    return message;
  }
  return 'Le serveur a rencontré un problème (erreur ' + error.status + ').';
}
