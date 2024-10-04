
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Products.Queries.GetProductsDetails;

public class GetProductsDetailsQueryHandler(
    IProductRepository productRepository)
 : IRequestHandler<GetProductDetailsQuery, BaseResult<ProductDetailsDto?>>
{
    public async Task<BaseResult<ProductDetailsDto?>> Handle(GetProductDetailsQuery request, CancellationToken cancellationToken)
    {
        var products = await productRepository.GetProductDetails(new Domain.Products.ProductId(request.ProductId));
        return products?.AsDetailsDto();
    }
}
