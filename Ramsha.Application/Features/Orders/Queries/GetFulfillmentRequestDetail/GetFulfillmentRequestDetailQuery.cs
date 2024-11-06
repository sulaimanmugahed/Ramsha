using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Dtos.Orders;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Orders.Queries.GetFulfillmentRequestDetail;

public class GetFulfillmentRequestDetailQuery : IRequest<BaseResult<FulfillmentRequestDetailDto?>>
{
    public Guid Id { get; set; }
}
