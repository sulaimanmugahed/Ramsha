using Microsoft.AspNetCore.Identity;


namespace Ramsha.Identity.Models;
public class ApplicationRole(string name) : IdentityRole<Guid>(name)
{
    public ICollection<Permission> Permissions { get; } = [];
    public void AddPermission(Permission permission)
    {
        Permissions.Add(permission);
    }

    public void RemovePermission(Permission permission)
    {
        Permissions.Remove(permission);
    }

    public void AddPermissions(IEnumerable<Permission> permissions)
    {
        foreach (var permission in permissions)
        {
            AddPermission(permission);
        }
    }

}
