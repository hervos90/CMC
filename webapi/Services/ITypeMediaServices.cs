using webapi.Models;
using webapi.Models.ViewsModels;

namespace webapi.Services
{
    public interface ITypeMediaServices
    {
        public List<TypeMediaViewModel> GetTypeMedias();
        public TypeMediaViewModel GetTypeMediaById(int id);
        public bool CreateTypeMedia(TypeMediaViewModel typeMedia);
        public bool UpdateTypeMedia(int id, TypeMediaViewModel typeMedia);
        public bool DeleteTypeMedia(int TypeMediaId);
    }
}
