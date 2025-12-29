using webapi.Models;
using webapi.Models.ViewsModels;

namespace webapi.Services
{
    public interface ILangueServices
    {
        public List<LangueViewModel> GetLangues();
        public LangueViewModel GetLangueById(int id);
        public bool CreateLangue(LangueViewModel langue);
        public bool UpdateLangue(int id, LangueViewModel langue);
        public bool DeleteLangue(int LangueId);
    }
}
