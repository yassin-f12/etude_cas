export type cat = `materiel`| `logiciel`| `reseau`| `compte`;
export type prio = `low`| `normal`| `high`| `urgent`;
export type stat = "in-progress"|"open"|"close"|"resolved";




export interface Ticket {
  id: number;
  title: string;
  description: string;
  category:cat;
  priority:prio;
  status:stat;
  requester: string;
  assignee?: string | null;
  createdAt: Date;


}
