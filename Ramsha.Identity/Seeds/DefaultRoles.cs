using Microsoft.AspNetCore.Identity;
using Ramsha.Identity.Models;
using Ramsha.Domain.Constants;

namespace Ramsha.Identity.Seeds
{
    public static class DefaultRoles
    {
        public static async Task SeedAsync(RoleManager<ApplicationRole> roleManager)
        {
            //Seed Roles
            if (!await roleManager.RoleExistsAsync(Roles.SuperAdmin))
                await roleManager.CreateAsync(new ApplicationRole(Roles.SuperAdmin));

            if (!await roleManager.RoleExistsAsync(Roles.Customer))
                await roleManager.CreateAsync(new ApplicationRole(Roles.Customer));

            if (!await roleManager.RoleExistsAsync(Roles.Supplier))
                await roleManager.CreateAsync(new ApplicationRole(Roles.Supplier));

            if (!await roleManager.RoleExistsAsync(Roles.Admin))
                await roleManager.CreateAsync(new ApplicationRole(Roles.Admin));

            if (!await roleManager.RoleExistsAsync(Roles.DeliveryAgent))
                await roleManager.CreateAsync(new ApplicationRole(Roles.DeliveryAgent));

        }
    }
}
