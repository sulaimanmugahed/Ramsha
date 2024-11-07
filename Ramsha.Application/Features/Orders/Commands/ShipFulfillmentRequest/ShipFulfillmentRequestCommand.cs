using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Orders.Commands.ShipFulfillmentRequest;

public class ShipFulfillmentRequestCommand : IRequest<BaseResult>
{
    public Guid OrderId { get; set; }
    public Guid FulfillmentRequestId { get; set; }

}
