using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Suppliers.Queries.GetCurrentSupplierProductVariantList;

public class GetCurrentSupplierProductVariantListQueryHandler(
    ISupplierProductRepository supplierProductRepository,
    ISupplierRepository supplierRepository,
    IAuthenticatedUserService authenticatedUserService
) : IRequestHandler<GetCurrentSupplierProductVariantListQuery, BaseResult<List<SupplierVariantDto>>>
{
    public async Task<BaseResult<List<SupplierVariantDto>>> Handle(GetCurrentSupplierProductVariantListQuery request, CancellationToken cancellationToken)
    {
        var supplier = await supplierRepository.GetAsync(x => x.Username == authenticatedUserService.UserName);
        if (supplier is null)
            return new Error(ErrorCode.ErrorInIdentity);

        var variants = await supplierProductRepository.GetVariantList(supplier.Id, new Domain.Products.ProductId(request.ProductId));
        return variants.Select(x => x.AsSupplierVariantDto()).ToList();
    }
}
