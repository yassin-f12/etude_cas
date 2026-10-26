# Sujet 3 : Support informatique

## Contexte

Au Campus Numérique de Lyon, les demandes d'assistance informatique arrivent par courriel, par téléphone ou dans les couloirs. Les techniciens oublient des demandes et personne ne sait où en est la sienne. Vous développez l'outil de suivi des tickets de support.

## L'API fictive

```bash
cd api-mock && npm install && npm run support
```

| Méthode | Route              | Rôle                                                                           |
| ------- | ------------------ | ------------------------------------------------------------------------------ |
| GET     | `/api/tickets`     | Les tickets (`?status=open`, `?priority=urgent`, `?q=wifi`)                    |
| GET     | `/api/tickets/:id` | Un ticket (`?_embed=comments` : avec ses commentaires)                         |
| POST    | `/api/tickets`     | Créer un ticket (le serveur fixe `status`, `assignee` et `createdAt`)          |
| PATCH   | `/api/tickets/:id` | Modifier un ticket : `{ "status": "in-progress", "assignee": "Karim Diallo" }` |
| GET     | `/api/comments`    | Les commentaires (`?ticketId=1&_sort=createdAt`)                               |
| POST    | `/api/comments`    | Ajouter un commentaire (le serveur fixe `createdAt`)                           |

```json
{
  "id": 2,
  "title": "Licence du logiciel de montage expirée",
  "description": "...",
  "category": "logiciel",
  "priority": "high",
  "status": "open",
  "requester": "hugo.lambert@campus-lyon.fr",
  "assignee": null,
  "createdAt": "2026-10-28T13:10:00.000Z"
}
```

```json
{
  "id": 1,
  "ticketId": 1,
  "author": "Karim Diallo",
  "body": "...",
  "createdAt": "2026-10-31T09:20:00.000Z"
}
```

Catégories : `materiel`, `logiciel`, `reseau`, `compte`. Priorités : `low`, `normal`, `high`, `urgent`. Statuts : `open`, `in-progress`, `resolved`, `closed`.

## Règles métier

1. Le titre fait de 5 à 80 caractères, la description au moins 20 ; la catégorie et la priorité sont obligatoires ; l'e-mail du demandeur est valide.
2. **Un ticket suit un cycle de statuts imposé** :
   - `open` vers `in-progress` (prise en charge : un technicien est obligatoire) ;
   - `in-progress` vers `resolved` ;
   - `resolved` vers `closed` (clôture) ou vers `in-progress` (réouverture) ;
   - `closed` est définitif.
3. Les tickets s'affichent par priorité (urgent d'abord), puis du plus ancien au plus récent.
4. Un ticket ouvert ou en cours depuis plus de 3 jours est **en souffrance**.
5. On ne commente pas un ticket clos.

L'API fictive ne contrôle rien : ces règles sont à appliquer dans le front.

## Fonctionnalités

### Socle (attendu de tous les groupes)

- **F1. Liste des tickets** (`/tickets`) : titre, catégorie, priorité, statut, date de création, triés selon la règle 3. État de chargement et message d'erreur si l'API ne répond pas.
- **F2. Détail d'un ticket** (`/tickets/:id`) : toutes ses informations et ses commentaires, du plus ancien au plus récent. Message clair pour un ticket inconnu.
- **F3. Créer un ticket** (`/tickets/nouveau`) : titre, description, catégorie, priorité, e-mail du demandeur. Règle 1 avec messages d'erreur accessibles. Après l'envoi, ouverture du détail du nouveau ticket.

### Intermédiaire

- **F4. Filtres** sur la liste : statut, priorité, recherche dans le titre. Les filtres sont dans l'URL (`/tickets?statut=open`).
- **F5. Changer le statut** depuis le détail : seules les transitions autorisées par la règle 2 sont proposées ; la prise en charge demande le nom du technicien.
- **F6. Commenter** un ticket depuis le détail (règle 5) ; le commentaire apparaît sans recharger la page.

### Avancé

- **F7. Tableau de bord** (`/`) : nombre de tickets par statut et liste des tickets en souffrance (règle 4).
- Tests unitaires des règles 2, 3 et 4 (transitions interdites, égalité de priorité, ticket créé il y a exactement 3 jours) et un test Playwright du parcours création puis prise en charge.
- Bonus : une API NestJS qui respecte le même contrat et renvoie 409 pour une transition interdite.

## Exigences transverses

- Un `<h1>` par page et un titre d'onglet par route (`title` dans les routes).
- Chaque champ a un libellé ; les erreurs sont reliées au champ (`aria-describedby`) et le récapitulatif est annoncé.
- La priorité et le statut ne sont pas signalés seulement par une couleur : un texte les nomme.
- Liste lisible sur un téléphone (375 px), sans défilement horizontal.

## Conseils de découpage

- `models/ticket.ts`, `models/comment.ts` : les interfaces, à écrire en premier, ensemble.
- `core/ticket-api.ts` : un service qui regroupe tous les appels à l'API.
- `shared/ticket-rules.ts` : les règles dans des **fonctions pures** (`nextStatuses(status)`, `compareTickets(a, b)`, `isStale(ticket, now)`), faciles à tester.
- `features/tickets/ticket-list`, `ticket-row`, `ticket-detail`, `ticket-form`, `comment-form`.

Indice pour la règle 2 : décrivez les transitions dans un objet plutôt qu'avec des `if` imbriqués.

```ts
const TRANSITIONS: Record<TicketStatus, TicketStatus[]> = {
  open: ["in-progress"],
  // ...
};
```
