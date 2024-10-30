
using MediatR;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Products.Queries.GetProductVariantSelection;

public class GetProductVariantSelectionQuery : IRequest<BaseResult<ProductVariantSelectionDto?>>
{
    public Guid ProductId { get; set; }
}
