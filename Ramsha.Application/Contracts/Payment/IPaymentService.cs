using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Domain.Customers.Entities;

namespace Ramsha.Application.Contracts.Payment;

public interface IPaymentService
{
    Task<PaymentIntentResponse?> CreateOrUpdatePaymentIntent(string? existPaymentIntentId, decimal finalAmount, string currency = "usd", List<string>? paymentMethodTypes = null);
}
