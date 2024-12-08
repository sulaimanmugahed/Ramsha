using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Dtos.Orders;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Orders.Queries.GetCurrentDeliveryAgentFulfillments;

public class GetCurrentDeliveryAgentFulfillmentsQuery : PagedParams, IRequest<BaseResult<List<FulfillmentRequestDto>>>
{

}
