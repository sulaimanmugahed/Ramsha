using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Products.Commands.AddProductOption;

public class AddProductOptionCommand : IRequest<BaseResult>
{
    public Guid ProductId { get; set; }
    public Guid OptionId { get; set; }
}
