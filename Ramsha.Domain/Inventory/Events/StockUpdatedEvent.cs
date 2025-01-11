using Ramsha.Domain.Common;
using Ramsha.Domain.Common.Events;
using Ramsha.Domain.Products;

namespace Ramsha.Domain.Inventory.Events;

public record StockUpdatedEvent(
     ProductId ProductId,
     ProductVariantId ProductVariantId
) : IDomainEvent
{ }

