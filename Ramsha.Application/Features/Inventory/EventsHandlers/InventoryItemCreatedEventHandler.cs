using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Inventory.Events;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Application.Features.Inventory.Events;

public class InventoryItemCreatedEventHandler(

) : INotificationHandler<InventoryItemCreatedEvent>
{
    public async Task Handle(InventoryItemCreatedEvent notification, CancellationToken cancellationToken)
    {

    }
}
