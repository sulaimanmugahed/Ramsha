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

namespace Ramsha.Application.Features.Suppliers.Queries.GetCurrentSupplierSupplyRequest;

public class GetCurrentSupplierSupplyRequestQueryHandler(
    ISupplyRequestRepository supplyRequestRepository,
    IAuthenticatedUserService authenticatedUserService
) : IRequestHandler<GetCurrentSupplierSupplyRequestQuery, BaseResult<SupplyRequestDto?>>
{
    public async Task<BaseResult<SupplyRequestDto?>> Handle(GetCurrentSupplierSupplyRequestQuery request, CancellationToken cancellationToken)
    {
        var supplyRequest = await supplyRequestRepository.GetWithDetails(
            x => x.Supplier == authenticatedUserService.UserName);

        return supplyRequest?.AsSupplyRequestDto();
    }
}
