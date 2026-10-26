// Les seules regles du faux serveur : les valeurs que le serveur, et non
// l'utilisateur, doit fixer a la creation. Tout le reste est accepte sans
// controle : les regles metier sont a coder dans le front (ou dans une vraie
// API NestJS, en bonus).
module.exports = (req, res, next) => {
  if (req.method === 'POST') {
    const now = new Date().toISOString();
    // Sujet 2 : un nouveau pret n'est jamais deja rendu.
    if (req.path === '/loans') {
      req.body.returnedAt = null;
    }
    // Sujet 3 : un nouveau ticket est ouvert, sans technicien, date du jour.
    if (req.path === '/tickets') {
      req.body.status = 'open';
      req.body.assignee = null;
      req.body.createdAt = now;
    }
    if (req.path === '/comments') {
      req.body.createdAt = now;
    }
  }
  next();
};
