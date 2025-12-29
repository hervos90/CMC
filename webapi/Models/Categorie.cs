using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class Categorie
    {
        public int Id { get; set; }
        public string? Code { get; set; }
        public string Libelle { get; set; }
        public string? Description { get; set; }
        public int TypeMediaId { get; set; }
        public TypeMedia TypeMedia { get; set; }
        public ICollection<Media> Medias { get; set; }
        //[Timestamp]
        //public byte DateInformation { get; set; }

    }
}
