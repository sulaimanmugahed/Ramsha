using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Orders.Events;
using Ramsha.Domain.Suppliers.Entities;

namespace Ramsha.Application.Features.Orders.EventsHandler;

public class NewOrderCreatedEventHandler(
    ISupplierRepository supplierRepository,
    IUnitOfWork unitOfWork
) : INotificationHandler<NewOrderCreatedEvent>
{
    public async Task Handle(NewOrderCreatedEvent notification, CancellationToken cancellationToken)
    {
        var orderItemsGroups = notification.OrderItems.GroupBy(x => x.ItemOrdered.SupplierId);
        foreach (var itemsGroup in orderItemsGroups)
        {
            var supplier = await supplierRepository.GetByIdAsync(itemsGroup.Key);
            if (supplier is null)
                return;

            var fulfillmentItems = itemsGroup.Select(item => new FulfillmentRequestItem
            {
                InventoryItemId = item.ItemOrdered.InventoryItemId,
                Quantity = item.Quantity,
                ImageUrl = item.ItemOrdered.PictureUrl,
                Name = item.ItemOrdered.Name,
                Price = item.Price,
                Sku = item.ItemOrdered.InventorySKU
            }).ToList();

            supplier.AddFulfillmentRequest(notification.OrderId, fulfillmentItems);
        }
        await unitOfWork.SaveChangesAsync();
    }
}
