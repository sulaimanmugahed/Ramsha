using Ramsha.Application.Dtos.Baskets;
using Ramsha.Application.Wrappers;
using MediatR;
namespace Ramsha.Application.Features.Baskets.Commands.AddItem;
public class AddItemToBasketCommand : IRequest<BaseResult<BasketItemDto>>
{
    public Guid InventoryItemId { get; set; }
    public int Quantity { get; set; }
}
