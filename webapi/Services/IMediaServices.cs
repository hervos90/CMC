using webapi.Models;
using webapi.Models.ViewsModels;

namespace webapi.Services
{
    public interface IMediaServices
    {
        public List<MediaViewModel> GetMedias();
        public MediaViewModel GetMediaById(int id);
        public bool CreateMedia(MediaViewModel media);
        public bool UpdateMedia(int id, MediaViewModel media);
        public bool DeleteMedia(int MediaId);
        public List<ActeurMedia> GetActeurMediaById(int id);
    }
}
