using Azure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Reflection.Metadata;
using webapi.Models;

namespace webapi.EF
{
    public class CMCContext :  IdentityDbContext<IdentityUser>
    {
       public CMCContext() { }

        public CMCContext(DbContextOptions<CMCContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<ActeurMedia>().HasKey(sc => new { sc.ActeurId, sc.MediaId });
            modelBuilder.Entity<RolePermission>().HasKey(sc => new { sc.RoleId, sc.PermissionId });
            modelBuilder.Entity<RolePermissionUtilisateur>().HasKey(sc => new { sc.RoleId, sc.PermissionId, sc.UtilisateurId });
        }

        public virtual  DbSet<Acteur> Acteurs { get; set; }
        public virtual DbSet<ActeurMedia> ActeurMedias { get; set; }
        public virtual DbSet<BandeAudio> BandeAudios { get; set; }
        public virtual DbSet<Categorie> Categories { get; set; }
        public virtual DbSet<Eglise> Eglises { get; set; }
        public virtual DbSet<Langue> Langues { get; set; }
        public virtual DbSet<Media> Medias { get; set; }
        public virtual DbSet<Orateur> Orateurs { get; set; }
        public virtual DbSet<Permission> Permissions { get; set; }
        public virtual DbSet<Personne> Personnes { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<RolePermission> RolePermissions { get; set; }
        public virtual DbSet<RolePermissionUtilisateur> RolePermissionUtilisateurs { get; set; }
        public virtual DbSet<TypeMedia> TypeMedias { get; set; }
        public virtual DbSet<Utilisateur> Utilisateurs { get; set; }
    }
}
