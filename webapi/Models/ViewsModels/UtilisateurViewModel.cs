namespace webapi.Models.ViewsModels
{
    public class UtilisateurViewModel
    {
        public int PersonneId { get; set; }
        public int UtilisateurId { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Pays { get; set; }
        public string Ville { get; set; }
    }
}
