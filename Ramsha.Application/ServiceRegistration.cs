using FluentValidation;
using Ramsha.Application.Contracts;
using Ramsha.Application.Services;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using Ramsha.Domain.Settings;
using Microsoft.Extensions.Configuration;


namespace Ramsha.Application;

public static class ServiceRegistration
{
    public static IServiceCollection AddApplicationLayer(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        services.AddMediatR(x => x.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

        services.AddScoped<IVariantService, VariantService>();
        services.AddScoped<ICodeGenerator, CodeGenerator>();

        services.Configure<GlobalAppSettings>(configuration.GetSection(nameof(GlobalAppSettings)));


        return services;

    }
}

