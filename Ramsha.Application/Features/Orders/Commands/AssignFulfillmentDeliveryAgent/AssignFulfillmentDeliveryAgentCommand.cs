using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Orders.Commands.AssignFulfillmentDeliveryAgent;

public class AssignFulfillmentDeliveryAgentCommand : IRequest<BaseResult>
{
    public Guid FulfillmentRequestId { get; set; }
    public Guid DeliveryAgentId { get; set; }

}
