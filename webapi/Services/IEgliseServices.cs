using webapi.Models;
using webapi.Models.ViewsModels;

namespace webapi.Services
{
    public interface IEgliseServices
    {

        public List<EgliseViewModel> GetEglises();
        public EgliseViewModel GetEgliseById(int id);
        public bool CreateEglise(EgliseViewModel eglise);
        public bool UpdateEglise(int id, EgliseViewModel eglise);
        public bool DeleteEglise(int EgliseId);
    }
}
