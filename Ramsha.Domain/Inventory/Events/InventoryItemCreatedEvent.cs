using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Domain.Common.Events;
using Ramsha.Domain.Products;


namespace Ramsha.Domain.Inventory.Events;

public sealed record InventoryItemCreatedEvent(
    InventoryItemId InventoryItemId,
    ProductId ProductId,
    ProductVariantId? ProductVariantId,
    int Quantity, decimal RetailPrice, decimal FinalPrice) : IDomainEvent
{
}

