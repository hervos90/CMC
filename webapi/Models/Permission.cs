using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class Permission
    {
        public int PermissionId { get; set; }
        public string Libelle { get; set; }
        public string Description { get; set; }
        [Timestamp]
        public byte DateInformation { get; set; }
        public IList<RolePermission> RolePermissions { get; set; }
        public IList<RolePermissionUtilisateur> RolePermissionUtilisateurs { get; set; }
    }
}
