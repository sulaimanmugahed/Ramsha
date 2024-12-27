using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using Ramsha.Identity.Models;

namespace Ramsha.Identity.Contexts;
public class IdentityContext : IdentityDbContext<Account, ApplicationRole, Guid>
{
    public IdentityContext(DbContextOptions<IdentityContext> options) : base(options)
    {
    }


    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.HasDefaultSchema("Identity");
        builder.Entity<Account>(entity =>
        {
            entity.ToTable(name: "Account");
            entity.OwnsMany(x => x.RefreshTokens);
            entity.OwnsOne(x => x.Address);

        });

        builder.Entity<AccountPermission>(entity =>
        {
            entity.HasKey(ap => new { ap.AccountId, ap.PermissionId });

            entity
            .HasOne(x => x.Account)
            .WithMany(a => a.Permissions)
            .HasForeignKey(ap => ap.AccountId);

            entity
                .HasOne(ap => ap.Permission)
                .WithMany()
                .HasForeignKey(ap => ap.PermissionId);
        });

        builder.Entity<Permission>(entity =>
        {
            entity.ToTable("Permissions");
            entity.HasKey(p => p.Id);
            entity.Property(p => p.Name).IsRequired();
        });

        builder.Entity<ApplicationRole>(entity =>
        {
            entity.ToTable(name: "Role");
            entity.HasMany(x => x.Permissions)
            .WithMany()
              .UsingEntity<ApplicationRolePermission>();
        });
        builder.Entity<IdentityUserRole<Guid>>(entity =>
        {
            entity.ToTable("UserRoles");
        });

        builder.Entity<IdentityUserClaim<Guid>>(entity =>
        {
            entity.ToTable("UserClaims");
        });

        builder.Entity<IdentityUserLogin<Guid>>(entity =>
        {
            entity.ToTable("UserLogins");
        });

        builder.Entity<IdentityRoleClaim<Guid>>(entity =>
        {
            entity.ToTable("RoleClaims");

        });

        builder.Entity<IdentityUserToken<Guid>>(entity =>
        {
            entity.ToTable("UserTokens");
        });
    }

    public DbSet<Permission> Permissions { get; set; } = null!;
}
