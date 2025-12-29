using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models
{
    public class BandeAudio
    {
        public int Id { get; set; }
        public DateTime DateTranscription { get; set; }
        [Column("LangueId")]
        public int? LangueOriginaleId { get; set; }
        public Langue LangueOriginale { get; set; }
        [Column("UtilisateurId")]
        public int TraducteurId { get; set; }
        public Utilisateur Traducteur { get; set; }
        public int MediaId { get; set; }
        public Media Media { get; set; }
 




       
       
    }
}
