
using Ramsha.Application.Dtos.Common;
using Ramsha.Application.Wrappers;
using MediatR;
using Ramsha.Application.Dtos.Products;

namespace Ramsha.Application.Features.Products.Queries.GetProductOptions;

public class GetProductOptionsQuery : IRequest<BaseResult<List<ProductOptionDto>?>>
{
    public Guid ProductId { get; set; }
}
