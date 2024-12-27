using Microsoft.AspNetCore.Identity;
using Ramsha.Application.Constants;
using Ramsha.Identity.Models;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Ramsha.Identity.Seeds;

public static class DefaultUser
{
    public static async Task SeedAsync(UserManager<Account> userManager)
    {
        var defaultUser = new Account
        {
            UserName = "sa",
            Email = "SuperAdmin@SuperAdmin.com",
            PhoneNumber = "+967773050577",
            EmailConfirmed = true,
            PhoneNumberConfirmed = true,
            Created = DateTime.UtcNow
        };
        if (userManager.Users.All(u => u.Id != defaultUser.Id))
        {
            var user = await userManager.FindByEmailAsync(defaultUser.Email);
            if (user == null)
            {
                var createdUser = await userManager.CreateAsync(defaultUser, "Test@12345");
                await userManager.AddToRoleAsync(defaultUser, "SuperAdmin");

            }


        }
    }
}
