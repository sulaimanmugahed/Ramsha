using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Domain.Common.Events;

namespace Ramsha.Domain.Inventory.Events;

public class
InventoryUpdatedEventHandler : IDomainEventHandler<InventoryUpdatedEvent>
{
    public void Handle(InventoryUpdatedEvent domainEvent)
    {
        var inventoryItem = domainEvent.InventoryItem;
        var variant = inventoryItem.ProductVariant;
        variant.UpdatePrice(inventoryItem.FinalPrice);
        variant.UpdateQuantity();
    }
}