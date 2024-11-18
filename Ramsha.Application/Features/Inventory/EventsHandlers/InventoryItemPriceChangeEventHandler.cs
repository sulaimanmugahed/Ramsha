using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Inventory.Events;

namespace Ramsha.Application.Features.Inventory.EventsHandlers;

public class InventoryItemPriceChangeEventHandler(
    IProductRepository productRepository,
    IUnitOfWork unitOfWork
)
: INotificationHandler<InventoryItemPriceChangeEvent>
{
    public async Task Handle(InventoryItemPriceChangeEvent notification, CancellationToken cancellationToken)
    {
        
      
    }
}
