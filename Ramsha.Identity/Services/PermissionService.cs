using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Ramsha.Application.Contracts.Identity;
using Ramsha.Identity.Contexts;
using Ramsha.Identity.Migrations;
using Ramsha.Identity.Models;

namespace Ramsha.Identity.Services;



public class PermissionService(IdentityContext context, RoleManager<ApplicationRole> _roleManager, UserManager<Account> userManager) : IPermissionService
{

    public async Task AddPermissionToRole(string roleName, string permissionName)
    {
        var role = await _roleManager.FindByNameAsync(roleName);
        var permission = await context.Permissions.FirstOrDefaultAsync(x => x.Name == permissionName);
        if (role is not null && permission is not null)
        {
            role.AddPermission(permission);
            await _roleManager.UpdateAsync(role);
        }
    }

    public async Task AddPermissionToUser(string username, string permissionName)
    {
        var user = await userManager.FindByNameAsync(username);
        var permission = await context.Permissions.FirstOrDefaultAsync(x => x.Name == permissionName);
        if (user is not null && permission is not null)
        {
            user.AddPermission(permission);
            await userManager.UpdateAsync(user);
        }
    }

    public async Task<IEnumerable<(Guid, string)>> GetPermissionsAsync()
    {
        var permissions = await context.Permissions.ToListAsync();
        return permissions.Select(x => (x.Id, x.Name));
    }

    public async Task<IEnumerable<(Guid, string)>> GetRolePermissionsAsync(string roleName)
    {
        var role = await _roleManager.Roles
            .Include(r => r.Permissions)
            .FirstOrDefaultAsync(r => r.Name == roleName);

        if (role is null)
        {
            return [];
        }

        return role.Permissions.Select(x => (x.Id, x.Name));

    }

    public async Task<IEnumerable<(Guid, string)>> GetPermissionsForUserAsync(string userName)
    {
        var user = await userManager.Users
            .Include(r => r.Permissions)
            .ThenInclude(x => x.Permission)
            .FirstOrDefaultAsync(x => x.UserName == userName);

        if (user is null)
        {
            return [];
        }

        return user.Permissions.Select(x => (x.Permission.Id, x.Permission.Name));

    }
}
