using MediatR;

using Ramsha.Domain.Inventory.Events;


namespace Ramsha.Application.Features.Inventory.EventsHandlers;
public class StockAddedEventHandler(

) : INotificationHandler<StockUpdatedEvent>
{
    public async Task Handle(StockUpdatedEvent notification, CancellationToken cancellationToken)
    {

    }
}
