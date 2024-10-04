
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Products.Queries.GetProductVariants;

public class GetProductVariantsQuery : IRequest<BaseResult<List<ProductVariantDto?>>>
{
    public Guid ProductId { get; set; }

}
