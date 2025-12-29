using webapi.EF;
using webapi.Models;
using webapi.Models.ViewsModels;

namespace webapi.Services
{
    public interface IUtilisateurServices
    {
        public List<UtilisateurViewModel> GetUtilisateurs();


        public Utilisateur GetUtilisateurById(int id);


        public bool CreateUtilisateur(UtilisateurViewModel utilisateur);


        public bool UpdateUtilisateur(UtilisateurViewModel utilisateur);


        public bool EnabledUtilisateur(Utilisateur utilisateur, bool disabled);
       
    }
}
