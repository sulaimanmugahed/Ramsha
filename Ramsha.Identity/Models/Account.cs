using Microsoft.AspNetCore.Identity;
using Ramsha.Domain.Common;
using Ramsha.Domain.Products.Enums;


namespace Ramsha.Identity.Models;
public class Account : IdentityUser<Guid>
{


    public List<RefreshToken> RefreshTokens { get; set; }
    public Address? Address { get; set; }
    public string? Avatar { get; set; }
    public CurrencyCode PreferredCurrency { get; set; }

    public DateTime Created { get; set; }

    public ICollection<AccountPermission> Permissions { get; private set; } = [];
    public void AddPermission(Permission permission)
    {
        Permissions.Add(new AccountPermission { Account = this, Permission = permission });
    }

    public void RemovePermission(Permission permission)
    {
        var exist = Permissions.FirstOrDefault(x => x.PermissionId == permission.Id);
        if (exist is not null)
            Permissions.Remove(exist);
    }

    public void AddPermissions(IEnumerable<Permission> permissions)
    {
        foreach (var permission in permissions)
        {
            AddPermission(permission);
        }
    }


}

