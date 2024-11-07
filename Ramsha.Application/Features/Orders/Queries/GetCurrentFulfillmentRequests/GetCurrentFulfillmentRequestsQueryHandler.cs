using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Orders;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Orders.Queries.GetCurrentSupplierFulfillmentRequests;

public class GetCurrentSupplierFulfillmentRequestsQueryHandler(
    IFulfillmentRequestRepository fulfillmentRequestRepository,
    ISupplierRepository supplierRepository,
    IAuthenticatedUserService authenticatedUserService,
    IHttpService httpService
) : IRequestHandler<GetCurrentSupplierFulfillmentRequestsQuery, BaseResult<List<FulfillmentRequestDto>>>
{
    public async Task<BaseResult<List<FulfillmentRequestDto>>> Handle(GetCurrentSupplierFulfillmentRequestsQuery request, CancellationToken cancellationToken)
    {
        var supplier = await supplierRepository.GetAsync(x => x.Username == authenticatedUserService.UserName);
        if (supplier is null)
            return new Error(ErrorCode.ErrorInIdentity);

        var responseDto = await fulfillmentRequestRepository.GetPaged(request.PaginationParams, request.FilterParams, request.SortingParams,x=> x.SupplierId == supplier.Id);

        responseDto.AddFilterMetaData(request.FilterParams);
        responseDto.AddSortingMetaData(request.SortingParams);

        httpService.AddPagedHeader(responseDto.MetaData);

        return responseDto.Data;

    }
}
