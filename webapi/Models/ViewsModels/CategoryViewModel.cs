namespace webapi.Models.ViewsModels
{
    public class CategoryViewModel
    {
        public int Id { get; set; }
        public string? Code { get; set; }
        public string Libelle { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int TypeMediaId { get; set; }
        public string TypeMediaNom { get; set; } = string.Empty;
    }
}
