using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ramsha.Application.Contracts.Payment;

public record PaymentIntentResponse(
     string PaymentIntentId,

     string ClientSecret
);

