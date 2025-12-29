using webapi.Models.ViewsModels;

namespace webapi.Services
{
    public interface IActeurServices
    {
        public List<ActeurViewModel> GetActeurs();
        public ActeurViewModel GetActeurById(int id);
        public bool CreateActeur(ActeurViewModel acteur);
        public bool UpdateActeur(int id, ActeurViewModel acteur);
        public bool DeleteActeur(int ActeurId);
    }
}
