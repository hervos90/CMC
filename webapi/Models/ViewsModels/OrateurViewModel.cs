namespace webapi.Models.ViewsModels
{
    public class OrateurViewModel
    {
        public int PersonneId { get; set; }
        public int OrateurId { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        //public string Login { get; set; }
        //public string Password { get; set; }
        public string Pays { get; set; }
        public string Titre { get; set; }
        public string Biographie {  get; set; }
        public string NomEglise { get; set; }
        public int EgliseId { get; set; }
    }
}
