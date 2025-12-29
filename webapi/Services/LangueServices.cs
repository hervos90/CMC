using webapi.EF;
using webapi.Models;
using webapi.Models.ViewsModels;

namespace webapi.Services
{
    public class LangueServices : ILangueServices
    {
        private readonly CMCContext _context;
        public LangueServices(CMCContext context)
        {
            _context = context;
        }

        public List<LangueViewModel> GetLangues()
        {
            return _context.Langues.Select(s => new LangueViewModel
            {
                LangueId = s.LangueId,
                Libelle = s.Libelle,
                Code = s.Code
            }).ToList();
        }

        public LangueViewModel GetLangueById(int id)
        {
            var media = _context.Langues.Where(s => s.LangueId == id).Select(s => new LangueViewModel
            {
                LangueId = s.LangueId,
                Libelle = s.Libelle,
                Code = s.Code
            }).FirstOrDefault();
            if (media != null) return media;
            return new LangueViewModel();

        }

        public bool CreateLangue(LangueViewModel langue)
        {
            try
            {
                Langue itemLangue = new Langue()
                {
                    Libelle = langue.Libelle,
                    Code = langue.Code
                };
                _context.Langues.Add(itemLangue);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return true;
        }

        public bool UpdateLangue(int id, LangueViewModel langue)
        {
            try
            {
                Langue langueItem = _context.Langues.Find(id);
                //vérifie si l'acteur existe
                if (langueItem != null)
                {
                    langueItem.Code = langue.Code;
                    langueItem.Libelle = langue.Libelle;
                    _context.SaveChanges();
                }

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return false;
        }

        public bool DeleteLangue(int LangueId)
        {
            try
            {
                //vérifie si l'acteur existe
                if (GetLangueById(LangueId) != null)
                {
                    Langue itemLangue = new Langue()
                    {
                        LangueId = LangueId
                    };
                    _context.Remove(itemLangue);
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
