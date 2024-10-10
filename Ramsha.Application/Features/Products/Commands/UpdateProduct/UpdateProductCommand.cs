using MediatR;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Products.Commands.UpdateProduct;

public class UpdateProductCommand : IRequest<BaseResult>
{
    public Guid ProductId { get; set; }
    public UpdateProductBasicCommand? ProductBasicCommand { get; set; }
    public UpdateProductAdditionalCommand? ProductAdditionalCommand { get; set; }
}
