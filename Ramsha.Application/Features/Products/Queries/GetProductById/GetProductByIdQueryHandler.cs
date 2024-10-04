
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Products.Queries.GetProductById;

public class GetProductByIdQueryHandler(
    IProductRepository productRepository
) : IRequestHandler<GetProductByIdQuery, BaseResult<ProductDto>>
{
    public async Task<BaseResult<ProductDto?>> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
    {
        var product = await productRepository.GetAsync(
        p => p.Id.Value == request.Id,
         x => x.Category,
         X => X.Inventories
        );

        return product?.AsDto();
    }
}
