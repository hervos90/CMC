using webapi.EF;
using webapi.Models;
using webapi.Models.ViewsModels;

namespace webapi.Services
{
    public class TypeMediaServices : ITypeMediaServices
    {
        private readonly CMCContext _context;
        public TypeMediaServices(CMCContext context)
        {
            _context = context;
        }

        public List<TypeMediaViewModel> GetTypeMedias()
        {
            return _context.TypeMedias.Select(s => new TypeMediaViewModel
            {
                TypeMediaId = s.TypeMediaId,
                Libelle = s.Libelle,
                Code = s.Code
            }).ToList();
        }

        public TypeMediaViewModel GetTypeMediaById(int id)
        {
            var media = _context.TypeMedias.Where(s => s.TypeMediaId == id).Select(s => new TypeMediaViewModel
            {
                TypeMediaId = s.TypeMediaId,
                Libelle = s.Libelle,
                Code = s.Code
            }).FirstOrDefault();
            if (media != null) return media;
            return new TypeMediaViewModel();

        }

        public bool CreateTypeMedia(TypeMediaViewModel typeMedia)
        {
            try
            {
                TypeMedia itemTypeMedia = new TypeMedia()
                {
                    Libelle = typeMedia.Libelle,
                    Code = typeMedia.Code
                };
                _context.TypeMedias.Add(itemTypeMedia);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return true;
        }

        public bool UpdateTypeMedia(int id, TypeMediaViewModel typeMedia)
        {
            try
            {
                TypeMedia typeMediaItem = _context.TypeMedias.Find(id);
                //vérifie si l'acteur existe
                if (typeMediaItem != null)
                {
                    typeMediaItem.Code = typeMedia.Code;
                    typeMediaItem.Libelle = typeMedia.Libelle;
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

        public bool DeleteTypeMedia(int TypeMediaId)
        {
            try
            {
                //vérifie si l'acteur existe
                if (GetTypeMediaById(TypeMediaId) != null)
                {
                    TypeMedia itemTypeMedia = new TypeMedia()
                    {
                        TypeMediaId = TypeMediaId
                    };
                    _context.Remove(itemTypeMedia);
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
