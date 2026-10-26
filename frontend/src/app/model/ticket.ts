export type TicketCategory = `materiel`| `logiciel`| `reseau`| `compte`;
export type TicketPriority = `low`| `normal`| `high`| `urgent`;
export type TicketStatus = "in-progress" | "open" | "resolved" | "closed";




export interface Ticket {
  id: number;
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  requester: string;
  assignee?: string | null;
  createdAt: string;


}
