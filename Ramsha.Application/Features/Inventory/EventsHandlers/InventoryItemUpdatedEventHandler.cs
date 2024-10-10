
using MediatR;

using Ramsha.Domain.Inventory.Events;

namespace Ramsha.Application.Features.Inventory.EventsHandlers;

public class InventoryItemUpdatedEventHandler(
) : INotificationHandler<InventoryItemUpdatedEvent>
{
    public async Task Handle(InventoryItemUpdatedEvent notification, CancellationToken cancellationToken)
    {

    }
}
