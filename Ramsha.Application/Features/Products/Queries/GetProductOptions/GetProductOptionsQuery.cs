
using Ramsha.Application.Dtos.Common;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Products.Queries.GetProductOptions;

public class GetProductOptionsQuery : IRequest<BaseResult<List<OptionDto>?>>
{
    public Guid ProductId { get; set; }
}
