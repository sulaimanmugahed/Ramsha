using FluentValidation;
using Ramsha.Application.Contracts;
using Ramsha.Application.Services;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;


namespace Ramsha.Application;

public static class ServiceRegistration
{
    public static IServiceCollection AddApplicationLayer(this IServiceCollection services)
    {
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        services.AddMediatR(x=> x.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

        services.AddScoped<IVariantService, VariantService>();

        return services;

    }
}

