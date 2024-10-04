using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Domain.Common.Events;
using Ramsha.Domain.Inventory.Entities;

namespace Ramsha.Domain.Inventory.Events;

public class InventoryUpdatedEvent : IDomainEvent
{
    public InventoryItem InventoryItem { get; }

    public InventoryUpdatedEvent(InventoryItem inventoryItem)
    {
        InventoryItem = inventoryItem;
    }
}
