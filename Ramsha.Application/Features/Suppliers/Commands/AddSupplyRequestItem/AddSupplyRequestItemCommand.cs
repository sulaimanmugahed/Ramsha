
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Suppliers.Commands.AddSupplyRequestItem;

public class AddSupplyRequestItemCommand : IRequest<BaseResult<SupplyRequestDto>>
{
    public Guid SupplyRequestId { get; set; }
    public Guid ProductId { get; set; }
    public decimal WholesalePrice { get; set; }
    public string SKU { get; set; }
    public int Quantity { get; set; }

}
