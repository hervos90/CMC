using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models
{
    public class Acteur
    {
        public int ActeurId { get; set; }
        public string Biographie { get; set; }
        public string Titre { get; set; }
        public int PersonneId { get; set; }
        public Personne Personne { get; set; }
        public IList<ActeurMedia> ActeurMedias { get; set; }

    }
}
