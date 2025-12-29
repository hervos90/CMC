namespace webapi.Models.ViewsModels
{
    public class MediaViewModel
    {
        public int Id { get; set; }
        public int LangueOriginaleId { get; set; }
        public string LangueOriginaleNom { get; set; }
        public string LinkMedia { get; set; }
        public string Titre { get; set; }
        public string Description { get; set; }
        public DateTime DatePublication { get; set; }
        public int? OrateurId { get; set; }
        public string NomOrateur { get; set; }
        public int CategorieId { get;set; }
        public string NomCategorie { get; set; }
        //public Orateur Orateur { get; set; }
        public int TypeMediaId { get; set; }
        public string NomTypeMedia { get; set; }
        public List<Acteur> ListActeurs { get; set; }
        public IFormFile Fichier { get; set; }
    }
}
