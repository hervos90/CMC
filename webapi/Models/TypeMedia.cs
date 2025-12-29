using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class TypeMedia
    {
        public int TypeMediaId { get; set; }
        public string Libelle { get; set; } = string.Empty;
        public string? Code { get; set;}
        public ICollection<Media> Medias { get; set; }
        public ICollection<Categorie> Categories { get; set; }
    }
}
