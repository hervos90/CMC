using webapi.Models;
using webapi.Models.ViewsModels;

namespace webapi.Services
{
    public interface ICategorieServices
    {
        public List<CategoryViewModel> GetCategories();
        public CategoryViewModel GetCategorieById(int id);
        public bool CreateCategorie(CategoryViewModel categorie);
        public bool UpdateCategorie(int id, CategoryViewModel categorie);
        public bool DeleteCategorie(int CategorieId);
    }
}
