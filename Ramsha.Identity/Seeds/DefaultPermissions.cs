using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Ramsha.Application.Constants;
using Ramsha.Domain.Constants;
using Ramsha.Identity.Contexts;
using Ramsha.Identity.Models;

namespace Ramsha.Identity.Seeds;

public static class DefaultPermissions
{
    public static async Task SeedAsync(IdentityContext context, RoleManager<ApplicationRole> roleManager, UserManager<Account> userManager)
    {
        if (!await context.Permissions.AnyAsync())
        {
            await context.Permissions.AddRangeAsync(ApplicationPermissions.All().Select(p => Permission.Create(p)));
            await context.SaveChangesAsync();
        }

        var superAdminRole = await roleManager.Roles.Include(x => x.Permissions).FirstOrDefaultAsync(x => x.Name == Roles.SuperAdmin);

        if (superAdminRole is null || superAdminRole.Permissions.Any())
        {
            return;
        }

        var superAdminUser = await userManager.Users.Include(x => x.Permissions).OrderBy(x => x.Created).FirstOrDefaultAsync();

        if (superAdminUser is null || superAdminUser.Permissions.Any())
        {
            return;
        }

        var permissions = await context.Permissions.ToListAsync();

        superAdminRole.AddPermissions(permissions);
        superAdminUser.AddPermissions(permissions);

        await roleManager.UpdateAsync(superAdminRole);
        await userManager.UpdateAsync(superAdminUser);



    }
}
