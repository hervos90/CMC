namespace webapi.Models
{
    public class Media
    {

        public int Id { get; set; }
        public string LinkMedia { get; set; }
        public string Titre { get; set; }
        public string? Description { get; set; }
        public DateTime DatePublication { get; set; }
        public int? OrateurId { get; set; }
        public Orateur Orateur { get; set; }
        public int TypeMediaId { get; set; }
        public TypeMedia TypeMedia { get; set; }
        public int LangueOriginaleId { get; set; }
        public Langue Langue { get; set; }
        public int CategorieId { get; set; }
        public Categorie Categorie { get; set; }
        public IList<ActeurMedia> ActeurMedias { get; set; }
    }
}
