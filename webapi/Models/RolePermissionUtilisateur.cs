using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class RolePermissionUtilisateur
    {
        public int UtilisateurId { get; set; }
        public Utilisateur Utilisateur { get; set; }
        public int? RoleId { get; set; }
        public Role Role { get; set; }
        public int? PermissionId { get; set; }
        public Permission Permission { get; set; }
    }
}
