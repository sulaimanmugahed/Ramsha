
using Microsoft.Extensions.Options;
using Ramsha.Application.Contracts.Payment;
using Ramsha.Application.Services;
using Ramsha.Domain.Customers.Entities;
using Ramsha.Domain.Settings;
using Stripe;

namespace Ramsha.PaymentService.Services;

public class PaymentServices(IOptionsSnapshot<StripeSettings> settings) : IPaymentService
{
    public async Task<PaymentIntentResponse?> CreateOrUpdatePaymentIntent(string? existPaymentIntentId, decimal finalAmount, string currency = "usd", List<string>? paymentMethodTypes = null)
    {

        StripeConfiguration.ApiKey = settings.Value.SecretKey;

        var service = new PaymentIntentService();
        var intent = new PaymentIntent();


        var stripeAmount = (long)Math.Round(finalAmount * 100);

        if (string.IsNullOrEmpty(existPaymentIntentId))
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = stripeAmount,
                Currency = currency,
                PaymentMethodTypes = paymentMethodTypes ?? ["card"]
            };

            intent = await service.CreateAsync(options);
        }
        else
        {
            var options = new PaymentIntentUpdateOptions
            {
                Amount = stripeAmount
            };

            intent = await service.UpdateAsync(existPaymentIntentId, options);
        }

        return intent != null ? new PaymentIntentResponse(intent.Id, intent.ClientSecret) : null;
    }
}
