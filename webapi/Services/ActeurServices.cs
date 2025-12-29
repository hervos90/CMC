using webapi.Models;
using webapi.EF;
using Microsoft.EntityFrameworkCore;
using webapi.Models.ViewsModels;
using System.Reflection.Metadata.Ecma335;

namespace webapi.Services
{
    public class ActeurServices : IActeurServices
    {
        private readonly CMCContext _context;
        public ActeurServices(CMCContext context)
        {
            _context = context;
        }

        public List<ActeurViewModel> GetActeurs()
        {
            return _context.Acteurs.Include(s => s.Personne).Select(s => new ActeurViewModel
            {
                PersonneId = s.PersonneId,
                ActeurId = s.ActeurId,
                Nom = s.Personne.Nom,
                Prenom = s.Personne.Prenom,
                Pays = s.Personne.Pays,
                Titre = s.Titre,
                Biographie = s.Biographie
            }).ToList();
        }

        public ActeurViewModel GetActeurById(int id)
        {
            var acteurs =  _context.Acteurs.Where(s => s.ActeurId == id).Include(s => s.Personne).Select(s => new ActeurViewModel
            {
                PersonneId = s.PersonneId,
                ActeurId = s.ActeurId,
                Nom = s.Personne.Nom,
                Prenom = s.Personne.Prenom,
                Pays = s.Personne.Pays,
                Titre = s.Titre,
                Biographie = s.Biographie
            }).FirstOrDefault();
            if (acteurs != null) return acteurs;
            return new ActeurViewModel();
        }

        public bool CreateActeur(ActeurViewModel acteur)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                Personne itemPersonne = new Personne()
                {
                    Nom = acteur.Nom,
                    Prenom = acteur.Prenom,
                    Pays = acteur.Pays
                };

                _context.Personnes.Add(itemPersonne);
                _context.SaveChanges();


                Acteur itemActeur = new Acteur()
                {
                    Titre = acteur.Titre,
                    Biographie = acteur.Biographie,
                    PersonneId = itemPersonne.PersonneId
                };
                _context.Acteurs.Add(itemActeur);
                _context.SaveChanges();
                transaction.Commit();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return true;
        }

        public bool UpdateActeur(int id, ActeurViewModel acteur)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                Personne itemPersonne = _context.Personnes.Find(acteur.PersonneId);
                //vérifie si l'acteur existe
                if (itemPersonne != null)
                {
                    itemPersonne.Nom = acteur.Nom;
                    itemPersonne.Prenom = acteur.Prenom;
                    itemPersonne.Pays = acteur.Pays;

                    //_context.Personnes.Add(itemPersonne);
                    _context.SaveChanges();
                }
                Acteur itemActeur = _context.Acteurs.Find(id);
                if (itemActeur != null)
                {
                    itemActeur.Titre = acteur.Titre;
                    itemActeur.Biographie = acteur.Biographie;
                    itemActeur.PersonneId = acteur.PersonneId;
                }
                //_context.Acteurs.Add(itemActeur);
                _context.SaveChanges();
                transaction.Commit();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return false;
        }

        public bool DeleteActeur(int ActeurId)
        {
            try
            {
                //vérifie si l'acteur existe
                if (GetActeurById(ActeurId) != null)
                {
                    Acteur itemActeur = new Acteur()
                    {
                        ActeurId = ActeurId
                    };
                    _context.Remove(itemActeur);
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return false;
        }

    }
}
