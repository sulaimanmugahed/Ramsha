using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Orders;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Orders.Queries.GetFulfillmentRequestDetail;

public class GetFulfillmentRequestDetailQueryHandler(
    IFulfillmentRequestRepository fulfillmentRequestRepository
) : IRequestHandler<GetFulfillmentRequestDetailQuery, BaseResult<FulfillmentRequestDetailDto?>>
{
    public async Task<BaseResult<FulfillmentRequestDetailDto?>> Handle(GetFulfillmentRequestDetailQuery request, CancellationToken cancellationToken)
    {
        var fulfillRequest = await fulfillmentRequestRepository.GetAsync(
         x => x.Id == new Domain.Orders.FulfillmentRequestId(request.Id),
         x => x.Order,
         x=> x.Items
         );

        return fulfillRequest?.AsFulfillmentRequestDetailDto();
    }
}
