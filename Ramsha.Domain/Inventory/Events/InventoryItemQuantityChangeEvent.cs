using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Domain.Common.Events;
using Ramsha.Domain.Products;

namespace Ramsha.Domain.Inventory.Events;

public record InventoryItemQuantityChangeEvent(
    ProductId ProductId,
    ProductVariantId? ProductVariantId,
    int QuantityChange) : IDomainEvent
{
}
