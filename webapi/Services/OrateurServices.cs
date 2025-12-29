using webapi.EF;
using webapi.Models.ViewsModels;
using webapi.Models;
using Microsoft.EntityFrameworkCore;

namespace webapi.Services
{

    public class OrateurServices : IOrateurServices
    {
        private readonly CMCContext _context;
        public OrateurServices(CMCContext context)
        {
            _context = context;
        }

        public List<OrateurViewModel> GetOrateurs()
        {
            return _context.Orateurs.Include(s => s.Personne)
                                    .Include(s => s.Eglise)
                                    .Select(s => new OrateurViewModel
                                    {
                                        Nom = s.Personne.Nom,
                                        Prenom = s.Personne.Prenom,
                                        Pays = s.Personne.Pays,
                                        Titre = s.Titre,
                                        NomEglise = s.Eglise.NomEglise,
                                        EgliseId = s.Eglise.EgliseId,
                                        Biographie = s.Biographie
                                    }).ToList();
        }

        public OrateurViewModel GetOrateurById(int id)
        {
#pragma warning disable CS8603 // Existence possible d'un retour de référence null.
            return _context.Orateurs.Where(s => s.OrateurId == id)
                                .Include(s => s.Personne)
                                .Select(s => new OrateurViewModel
                                {
                                    Nom = s.Personne.Nom,
                                    Prenom = s.Personne.Prenom,
                                    Pays = s.Personne.Pays,
                                    Titre = s.Titre,
                                    NomEglise = s.Eglise.NomEglise,
                                    EgliseId = s.Eglise.EgliseId,
                                    Biographie = s.Biographie
                                }).FirstOrDefault();
#pragma warning restore CS8603 // Existence possible d'un retour de référence null.

        }

        public bool CreateOrateur(OrateurViewModel orateur)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                Personne itemPersonne = new Personne()
                {
                    Nom = orateur.Nom,
                    Prenom = orateur.Prenom,
                    Pays = orateur.Pays,
                };

                _context.Personnes.Add(itemPersonne);
                _context.SaveChanges();


                Orateur itemOrateur = new Orateur()
                {
                    Titre = orateur.Titre,
                    Biographie = orateur.Biographie,
                    PersonneId = itemPersonne.PersonneId,
                    EgliseId = orateur.EgliseId
                };
                _context.Orateurs.Add(itemOrateur);
                _context.SaveChanges();
                transaction.Commit();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return true;
        }

        public bool UpdateOrateur(int id, OrateurViewModel orateur)
        {

            using var transaction = _context.Database.BeginTransaction();
            try
            {
                if (GetOrateurById(id) != null)
                {
                    Personne itemPersonne = new Personne()
                    {
                        PersonneId = orateur.PersonneId,
                        Nom = orateur.Nom,
                        Prenom = orateur.Prenom,
                        Pays = orateur.Pays,
                        
                    };
                    _context.SaveChanges();

                    Orateur itemOrateur = new Orateur()
                    {
                        Titre = orateur.Titre,
                        Biographie = orateur.Biographie,
                        PersonneId = itemPersonne.PersonneId,
                        EgliseId = orateur.EgliseId
                    };
                    _context.SaveChanges();
                    transaction.Commit();
                    return true;
                }
                
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return false;
        }

        public bool DeleteOrateur(int OrateurId)
        {
            try
            {
                Orateur itemOrateur = new Orateur()
                {
                    OrateurId = OrateurId
                };
                _context.Remove(itemOrateur);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return true;
        }

    }
}
