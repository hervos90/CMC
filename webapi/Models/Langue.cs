using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class Langue
    {
        public int LangueId {  get; set; }  
        
        public string Libelle { get; set; }
        public string? Code {  get; set; }
        
        public ICollection<BandeAudio> BandeAudios { get; set; }
        public ICollection<Media> Medias { get; set; }
    }
}
