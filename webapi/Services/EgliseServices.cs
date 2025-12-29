using webapi.EF;
using webapi.Models.ViewsModels;
using webapi.Models;
using Microsoft.EntityFrameworkCore;

namespace webapi.Services
{
    public class EgliseServices : IEgliseServices
    {
        private readonly CMCContext _context;
        public EgliseServices(CMCContext context)
        {
            _context = context;
        }

        public List<EgliseViewModel> GetEglises()
        {
            return _context.Eglises.Select(s => new EgliseViewModel
            {
                 EgliseId = s.EgliseId,
                 NomEglise = s.NomEglise,
                 DescriptionEglise = s.DescriptionEglise
             }).ToList();
        }

        public EgliseViewModel GetEgliseById(int id)
        {
            var media = _context.Eglises.Where(s => s.EgliseId == id).Select(s => new EgliseViewModel
            {
                EgliseId = s.EgliseId,
                NomEglise = s.NomEglise,
                DescriptionEglise = s.DescriptionEglise
            }).FirstOrDefault();
            if (media != null) return media;
            return new EgliseViewModel();
        }

        public bool CreateEglise(EgliseViewModel eglise)
        {
            try
            {
                Eglise itemEglise= new Eglise()
                {
                    NomEglise = eglise.NomEglise,
                    DescriptionEglise = eglise.DescriptionEglise
                };
                _context.Eglises.Add(itemEglise);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return true;
        }

        public bool UpdateEglise(int id, EgliseViewModel eglise)
        {
            try
            {
                Eglise egliseItem = _context.Eglises.Find(id);
                //vérifie si l'acteur existe
                if (egliseItem != null)
                {
                    egliseItem.NomEglise = eglise.NomEglise;
                    egliseItem.DescriptionEglise = eglise.DescriptionEglise;
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

        public bool DeleteEglise(int EgliseId)
        {
            try
            {
                //vérifie si l'acteur existe
                if (GetEgliseById(EgliseId) != null)
                {
                    Eglise itemEglise = new Eglise()
                    {
                        EgliseId = EgliseId
                    };
                    _context.Remove(itemEglise);
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
