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

namespace Ramsha.Application.Features.Suppliers.Queries.GetSupplyRequestItem;

public class GetSupplyRequestItemQueryHandler(
    ISupplyRequestRepository supplyRequestRepository,
    IAuthenticatedUserService authenticatedUserService
) : IRequestHandler<GetSupplyRequestItemQuery, BaseResult<SupplyRequestItemDto?>>
{
    public async Task<BaseResult<SupplyRequestItemDto?>> Handle(GetSupplyRequestItemQuery request, CancellationToken cancellationToken)
    {
        var supplyRequest = await supplyRequestRepository
      .GetWithDetails(x => x.Supplier == authenticatedUserService.UserName);

        if (supplyRequest is null)
            return new Error(ErrorCode.RequestedDataNotExist, "no supplyRequest exist");

        return supplyRequest.Items.FirstOrDefault(x => x.Id.Value == request.SupplyRequestItemId)?.AsRequestItemDto();
    }
}
