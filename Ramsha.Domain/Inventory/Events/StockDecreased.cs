

using Ramsha.Domain.Common.Events;
using Ramsha.Domain.Products;

namespace Ramsha.Domain.Inventory.Events;

public record StockDecreased(
  ProductId ProductId,
ProductVariantId? ProductVariantId
) : IDomainEvent
{ }
