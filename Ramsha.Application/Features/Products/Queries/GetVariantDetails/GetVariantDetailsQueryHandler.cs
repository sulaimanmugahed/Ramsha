
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Products.Queries.GetVariantDetails;

public class GetVariantDetailsQueryHandler(
    IProductRepository productRepository
) : IRequestHandler<GetVariantDetailsQuery, BaseResult<VariantDetailDto?>>
{
    public async Task<BaseResult<VariantDetailDto?>> Handle(GetVariantDetailsQuery request, CancellationToken cancellationToken)
    {
        var variant = await productRepository.GetVariantDetails(
            new Domain.Products.ProductId(request.ProductId),
            new Domain.Products.ProductVariantId(request.ProductVariantId)
        );
        if (variant is null)
            return new Error(ErrorCode.EmptyData);

        return variant.AsDetailsDto();
    }
}
