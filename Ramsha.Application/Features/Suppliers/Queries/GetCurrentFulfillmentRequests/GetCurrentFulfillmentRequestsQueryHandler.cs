using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Suppliers.Queries.GetCurrentSupplierFulfillmentRequests;

public class GetCurrentSupplierFulfillmentRequestsQueryHandler(
    IFulfillmentRequestRepository fulfillmentRequestRepository,
    ISupplierRepository supplierRepository,
    IAuthenticatedUserService authenticatedUserService
) : IRequestHandler<GetCurrentSupplierFulfillmentRequestsQuery, BaseResult<List<FulfillmentRequestDto>>>
{
    public async Task<BaseResult<List<FulfillmentRequestDto>>> Handle(GetCurrentSupplierFulfillmentRequestsQuery request, CancellationToken cancellationToken)
    {
        var supplier = await supplierRepository.GetAsync(x => x.Username == authenticatedUserService.UserName);
        if (supplier is null)
            return new Error(ErrorCode.ErrorInIdentity);

        var requests = await fulfillmentRequestRepository.GetAllAsync(x => x.SupplierId == supplier.Id);
        return requests.Select(x => x.AsFulfillmentRequestDto()).ToList();
    }
}
