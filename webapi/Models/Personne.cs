namespace webapi.Models
{
    public class Personne
    {
        public int PersonneId { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; } 
        public string Pays { get; set; }
        public string? Ville { get; set; }

        public ICollection<Utilisateur> Utilisateurs { get; set; }
        public ICollection<Orateur> Orateurs { get; set; }
        public ICollection<Acteur> Acteurs { get; set; }


    }
}
