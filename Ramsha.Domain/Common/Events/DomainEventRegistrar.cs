using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Domain.Inventory.Events;
using Ramsha.Domain.Products.Events;

namespace Ramsha.Domain.Common.Events;

public static class DomainEventRegistrar
{
    public static void RegisterHandlers()
    {
        DomainEvents.RegisterHandler(new InventoryUpdatedEventHandler());
       // DomainEvents.RegisterHandler(new VariantUpdatedEventHandler());
        // Register other handlers as needed...
    }
}
