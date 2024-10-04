


using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Persistence.Contexts;
using Ramsha.Persistence.Repositories;
using System.Reflection;


namespace Ramsha.Persistence;
public static class ServiceRegistration
{
    public static IServiceCollection AddPersistenceInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(
           configuration.GetConnectionString("DefaultConnection"),
           b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));

        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.RegisterRepositories();

        return services;

    }
    private static void RegisterRepositories(this IServiceCollection services)
    {
        services.AddTransient(typeof(IGenericRepository<,>), typeof(GenericRepository<,>));

        var interfaceType = typeof(IGenericRepository<,>);
        var interfaces = Assembly.GetAssembly(interfaceType).GetTypes()
            .Where(p => p.GetInterface(interfaceType.Name.ToString()) != null);

        foreach (var item in interfaces)
        {
            var implimentation = Assembly.GetAssembly(typeof(GenericRepository<,>)).GetTypes()
                .FirstOrDefault(p => p.GetInterface(item.Name.ToString()) != null);
            services.AddTransient(item, implimentation);

        }

    }
}
