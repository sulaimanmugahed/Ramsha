
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Common;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Products.Queries.GetProductOptions;

public class GetProductOptionsQueryHandler(
    IProductRepository productRepository
) : IRequestHandler<GetProductOptionsQuery, BaseResult<List<OptionDto>?>>
{
    public async Task<BaseResult<List<OptionDto>?>> Handle(GetProductOptionsQuery request, CancellationToken cancellationToken)
    {
        var product = await productRepository.GetProductWithOptions(new Domain.Products.ProductId(request.ProductId));
        return product?.Options.Select(x => x.AsDto()).ToList();
    }
}
