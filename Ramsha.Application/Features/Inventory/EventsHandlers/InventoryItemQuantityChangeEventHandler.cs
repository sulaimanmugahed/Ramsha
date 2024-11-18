using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Inventory.Events;

namespace Ramsha.Application.Features.Inventory.EventsHandlers;

public class InventoryItemQuantityChangeEventHandler(
    IProductRepository productRepository,
    IUnitOfWork unitOfWork
) : INotificationHandler<InventoryItemQuantityChangeEvent>
{

    public async Task Handle(InventoryItemQuantityChangeEvent notification, CancellationToken cancellationToken)
    {
     

    }


}
