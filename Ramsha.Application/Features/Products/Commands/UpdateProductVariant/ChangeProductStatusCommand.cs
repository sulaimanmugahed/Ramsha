
using MediatR;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products;
using Ramsha.Domain.Products.Enums;

namespace Ramsha.Application.Features.Products.Commands.UpdateProductVariant;

public class ChangeProductStatusCommand : IRequest<BaseResult>
{
    public Guid ProductId { get; set; }
    public ProductStatus Status { get; set; }
}
