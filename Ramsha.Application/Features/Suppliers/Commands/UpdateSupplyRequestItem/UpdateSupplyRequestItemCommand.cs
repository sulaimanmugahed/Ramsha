using MediatR;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Suppliers.Commands.UpdateSupplyRequestItem;

public class UpdateSupplyRequestItemCommand:IRequest<BaseResult>
{
    public Guid SupplyRequestItemId { get; set; }
    public int Quantity { get; set; }
    public decimal WholesalePrice { get; set; }

}
