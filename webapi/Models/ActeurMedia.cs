using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class ActeurMedia
    {
        public int ActeurId { get; set; }
        public Acteur Acteur { get; set; }
        public int MediaId { get; set; }
        public Media Media { get; set; }
        public string? Biographie { get; set; }
    }
}
