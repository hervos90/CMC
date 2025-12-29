namespace webapi.Models.ViewsModels
{
    public class ActeurViewModel
    {
        public int PersonneId { get; set; }
        public int ActeurId { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Titre { get; set; }
        public string Biographie { get; set; }
        public string Pays { get; set; }
    }
}
