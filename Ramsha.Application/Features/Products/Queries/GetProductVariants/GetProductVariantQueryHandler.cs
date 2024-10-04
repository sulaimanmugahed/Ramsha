
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Products.Queries.GetProductVariants;

public class GetProductVariantQueryHandler(
    IProductRepository productRepository
) : IRequestHandler<GetProductVariantQuery, BaseResult<ProductVariantDto>>
{
    public async Task<BaseResult<ProductVariantDto>> Handle(GetProductVariantQuery request, CancellationToken cancellationToken)
    {
        var variant = await productRepository.GetVariantDetails(
           new Domain.Products.ProductId(request.ProductId),
           new Domain.Products.ProductVariantId(request.VariantId)
       );
        if (variant is null)
            return new Error(ErrorCode.EmptyData);

        return variant.AsDto();
    }
} 
