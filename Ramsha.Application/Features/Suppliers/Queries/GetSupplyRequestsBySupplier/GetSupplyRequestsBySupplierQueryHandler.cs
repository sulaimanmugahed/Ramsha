
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Suppliers.Queries.GetSupplyRequestsBySupplier;

public class GetSupplyRequestsBySupplierQueryHandler(
    ISupplyRequestRepository supplyRequestRepository,
    ISupplierRepository supplierRepository,
    IAuthenticatedUserService authenticatedUser
) : IRequestHandler<GetSupplyRequestsBySupplierQuery, BaseResult<List<SupplyRequestDto>>>
{
    public async Task<BaseResult<List<SupplyRequestDto>>> Handle(GetSupplyRequestsBySupplierQuery request, CancellationToken cancellationToken)
    {
        var supplier = await supplierRepository.FindByUsername(authenticatedUser.UserName);
        if (supplier is null)
            return new Error(ErrorCode.ErrorInIdentity);

        var requests = await supplyRequestRepository.FindAllWithDetail(x => x.Supplier == authenticatedUser.UserName);

        return requests.Select(r => r.AsSupplyRequestDto()).ToList();
    }
}
