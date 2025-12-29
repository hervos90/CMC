using Microsoft.EntityFrameworkCore;
using webapi.EF;
using webapi.Models;
using webapi.Models.ViewsModels;

namespace webapi.Services
{
    public class CategorieServices : ICategorieServices
    {
        private readonly CMCContext _context;
        public CategorieServices(CMCContext context)
        {
            _context = context;
        }

        public List<CategoryViewModel> GetCategories()
        {
            return _context.Categories.Include(s => s.TypeMedia).Select(s => new CategoryViewModel
            {
                Id = s.Id,
                Libelle = s.Libelle,
                TypeMediaNom = s.TypeMedia.Libelle,
                Description = s.Description,
                TypeMediaId = s.TypeMedia.TypeMediaId,
                Code = s.Code,
            }).ToList();
        }

        public CategoryViewModel GetCategorieById(int id)
        {
            var categorie =  _context.Categories.Where(s => s.Id == id).Include(s => s.TypeMedia).Select(s => new CategoryViewModel
            {
                Id = s.Id,
                Libelle = s.Libelle,
                TypeMediaNom = s.TypeMedia.Libelle,
                Description = s.Description,
                TypeMediaId = s.TypeMedia.TypeMediaId,
                Code = s.Code,
            }).FirstOrDefault();
            if (categorie != null) return categorie;
            return new CategoryViewModel();

        }

        public bool CreateCategorie(CategoryViewModel categorie)
        {
            try
            {
                Categorie itemCategorie = new Categorie()
                {
                    Code = categorie.Code,
                    Libelle = categorie.Libelle,
                    Description = categorie.Description,
                    TypeMediaId = categorie.TypeMediaId
                };
                _context.Categories.Add(itemCategorie);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return true;
        }

        public bool UpdateCategorie(int id, CategoryViewModel categorie)
        {
            try
            {
                Categorie categorieItem = _context.Categories.Find(id);
                //vérifie si l'acteur existe
                if (categorieItem != null)
                {
                    categorieItem.Code = categorie.Code;
                    categorieItem.Libelle = categorie.Libelle;
                    categorieItem.Description = categorie.Description;
                    categorieItem.TypeMediaId = categorie.TypeMediaId;
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

        public bool DeleteCategorie(int CategorieId)
        {
            try
            {
                //vérifie si l'acteur existe
                if (GetCategorieById(CategorieId) != null)
                {
                    Categorie itemCategorie = new Categorie()
                    {
                        Id = CategorieId
                    };
                    _context.Remove(itemCategorie);
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
