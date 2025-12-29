using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using webapi.EF;
using webapi.Models;
using webapi.Models.ViewsModels;


namespace webapi.Services
{
    public class UtilisateurServices : IUtilisateurServices
    {
        private readonly CMCContext _context;
        public UtilisateurServices(CMCContext context)
        { 
            _context = context;
        }

        public List<UtilisateurViewModel> GetUtilisateurs()
        {
            return _context.Utilisateurs.Include(s => s.Personne).Select(s => new UtilisateurViewModel
            {
                Nom = s.Personne.Nom,
                Prenom = s.Personne.Prenom,
                Pays = s.Personne.Pays,
                Ville = s.Personne.Ville
            }).ToList();
        }

        public Utilisateur GetUtilisateurById(int id)
        {
            return _context.Utilisateurs.Where(s => s.UtilisateurId == id).Include(s => s.Personne).FirstOrDefault();

        }

        public bool CreateUtilisateur(UtilisateurViewModel utilisateur)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                Personne itemPersonne = new Personne()
                {
                    Nom = utilisateur.Nom,
                    Prenom = utilisateur.Prenom,
                    Pays = utilisateur.Pays,
                    Ville = utilisateur.Ville
                };

                _context.Personnes.Add(itemPersonne);
                _context.SaveChanges();


                Utilisateur itemUtilisateur = new Utilisateur()
                {
                    Statut = true,
                    Login = utilisateur.Login,
                    Password = utilisateur.Password,
                    Is_login = false,
                    PersonneId = itemPersonne.PersonneId
                };
                _context.Utilisateurs.Add(itemUtilisateur);
                _context.SaveChanges();
                transaction.Commit();
            }
            catch(Exception ex)
            {
                throw ex;
            }
            return true;
        }

        public bool UpdateUtilisateur(UtilisateurViewModel utilisateur) {

            using var transaction = _context.Database.BeginTransaction();
            try
            {
                Personne itemPersonne = new Personne()
                {
                    PersonneId = utilisateur.PersonneId,
                    Nom = utilisateur.Nom,
                    Prenom = utilisateur.Prenom,
                    Pays = utilisateur.Pays,
                    Ville = utilisateur.Ville
                };

                _context.Personnes.Add(itemPersonne);
                _context.SaveChanges();

                Utilisateur itemUtilisateur = new Utilisateur()
                {
                    UtilisateurId = utilisateur.UtilisateurId,
                    Statut = true,
                    Login = utilisateur.Login,
                    Password = utilisateur.Password,
                    Is_login = false,
                    Personne = itemPersonne
                };
                _context.Utilisateurs.Add(itemUtilisateur);
                _context.SaveChanges();
                transaction.Commit();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return true;
        }

        public bool EnabledUtilisateur(Utilisateur utilisateur, bool disabled)
        {
            try
            {
                Utilisateur itemUtilisateur = new Utilisateur()
                {
                    Statut = disabled
                };
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return true;
        }
    }
}
