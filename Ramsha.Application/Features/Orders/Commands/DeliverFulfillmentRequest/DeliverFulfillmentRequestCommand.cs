using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Orders.Commands.DeliverFulfillmentRequest;

public class DeliverFulfillmentRequestCommand : IRequest<BaseResult>
{
    public Guid FulfillmentRequestId { get; set; }
    public Guid OrderId { get; set; }


}
