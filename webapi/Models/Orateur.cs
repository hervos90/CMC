using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models
{
    public class Orateur
    {
        public int OrateurId { get; set; }
        public int PersonneId { get; set; }
        public Personne Personne { get; set; }
        public string Biographie { get; set; }
        public string Titre { get; set; }
        public int EgliseId {  get; set; }  
        public Eglise Eglise { get; set; }
        public ICollection<Media> Medias { get; set; }
       

    }
}
