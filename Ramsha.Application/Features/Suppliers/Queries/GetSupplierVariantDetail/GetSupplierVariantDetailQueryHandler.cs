using MediatR;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Catalog;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Suppliers.Queries.GetSupplierVariantDetail;

public class GetSupplierVariantDetailQueryHandler(
) : IRequestHandler<GetSupplierVariantDetailQuery, BaseResult<CatalogSupplierItemDetailDto>>
{
    public async Task<BaseResult<CatalogSupplierItemDetailDto>> Handle(GetSupplierVariantDetailQuery request, CancellationToken cancellationToken)
    {
        return new BaseResult<CatalogSupplierItemDetailDto>();
    }
}
