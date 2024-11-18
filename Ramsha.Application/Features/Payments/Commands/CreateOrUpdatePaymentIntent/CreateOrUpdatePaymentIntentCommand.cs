using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Dtos.Baskets;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Payments.Commands.CreateOrUpdatePaymentIntent;

public class CreateOrUpdatePaymentIntentCommand:IRequest<BaseResult<BasketDto>>
{
    
}
