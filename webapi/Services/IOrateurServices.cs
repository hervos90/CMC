using webapi.Models.ViewsModels;

namespace webapi.Services
{
    public interface IOrateurServices
    {

        public List<OrateurViewModel> GetOrateurs();
        public OrateurViewModel GetOrateurById(int id);
        public bool CreateOrateur(OrateurViewModel orateur);
        public bool UpdateOrateur(int id, OrateurViewModel orateur);
        public bool DeleteOrateur(int OrateurId);
    }
}
