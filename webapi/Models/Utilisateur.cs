using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class Utilisateur
    {
        public int UtilisateurId { get; set; }
        public bool Statut { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public bool Is_login { get; set; }
        //[Timestamp]
        //public byte DateInformation { get; set; }
        public int PersonneId { get; set; }
        public Personne Personne { get; set; }

        public ICollection<BandeAudio> ?BandeAudios { get; set; }
        public IList<RolePermissionUtilisateur> RolePermissionUtilisateurs { get; set; }

    }
}
