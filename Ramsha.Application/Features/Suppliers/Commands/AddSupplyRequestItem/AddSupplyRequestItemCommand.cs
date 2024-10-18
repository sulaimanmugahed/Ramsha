
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Suppliers.Commands.AddSupplyRequestItem;

public class AddSupplyRequestItemCommand : IRequest<BaseResult<SupplyRequestDto>>
{
    public Guid ProductId { get; set; }
    public decimal WholesalePrice { get; set; }
    public Guid ProductVariantId { get; set; }
    public int Quantity { get; set; }

}
