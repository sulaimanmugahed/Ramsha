
using MediatR;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Catalog;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Catalog.Queries.GetCatalogProductDetail;

public class GetCatalogProductDetailQueryHandler(
    IProductRepository productRepository
) : IRequestHandler<GetCatalogProductDetailQuery, BaseResult<CatalogProductDetailDto>>
{
    public async Task<BaseResult<CatalogProductDetailDto>> Handle(GetCatalogProductDetailQuery request, CancellationToken cancellationToken)
    {
        var product = await productRepository.GetProductCatalogDetail(new Domain.Products.ProductId(request.ProductId));
        if (product is null)
            return new Error(ErrorCode.RequestedDataNotExist);

        return product;
    }
}
