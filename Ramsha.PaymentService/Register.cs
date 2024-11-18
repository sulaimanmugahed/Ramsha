using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Ramsha.Application.Contracts.Payment;
using Ramsha.Domain.Settings;
using Ramsha.PaymentService.Services;

namespace Ramsha.PaymentService;

public static class Register
{
    public static IServiceCollection AddAppPaymentServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<StripeSettings>(configuration.GetSection(nameof(StripeSettings)));

        services.AddScoped<IPaymentService, PaymentServices>();

        return services;
    }

}
