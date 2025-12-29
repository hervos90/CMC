namespace webapi.Models
{
    public class Role
    {
        public int Id { get; set; }
        public string Libelle { get; set; }
        public string Description { get; set; }
        public IList<RolePermission> RolePermissions { get; set; }
        public IList<RolePermissionUtilisateur> RolePermissionUtilisateurs { get; set; }
    }
}
