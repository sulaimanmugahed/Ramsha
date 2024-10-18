
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Common;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using MediatR;
using Ramsha.Application.Dtos.Products;

namespace Ramsha.Application.Features.Products.Queries.GetProductOptions;

public class GetProductOptionsQueryHandler(
    IProductRepository productRepository
) : IRequestHandler<GetProductOptionsQuery, BaseResult<List<ProductOptionDto>?>>
{
    public async Task<BaseResult<List<ProductOptionDto>?>> Handle(GetProductOptionsQuery request, CancellationToken cancellationToken)
    {
        var options = await productRepository.GetProductOptions(new Domain.Products.ProductId(request.ProductId));

        return options.Select(x => x.AsProductOption()).ToList();
    }
}
