using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Domain.Common.Events;
using Ramsha.Domain.Products;

namespace Ramsha.Domain.Inventory.Events;

public record InventoryItemPriceChangeEvent(
   ProductId ProductId,
   ProductVariantId? ProductVariantId,
    decimal RetailPrice,
    decimal FinalPrice) : IDomainEvent
{
}