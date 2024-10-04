using Microsoft.EntityFrameworkCore;
using Ramsha.Identity.Contexts;
using Ramsha.Persistence.Contexts;

namespace Ramsha.Api.Infrastructure.Extensions;

public static class ApplyMigrationsExtension
{
    public static void ApplyMigrations(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;

        services.GetRequiredService<IdentityContext>().Database.Migrate();
        services.GetRequiredService<ApplicationDbContext>().Database.Migrate();
    }
}
