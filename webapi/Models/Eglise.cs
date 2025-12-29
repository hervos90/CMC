using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class Eglise
    {
        public int EgliseId { get; set; }
        public string NomEglise { get; set; }
        public string? DescriptionEglise { get; set; }
        public ICollection<Orateur> Orateurs { get; set; }
    }
}
