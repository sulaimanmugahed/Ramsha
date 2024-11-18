

using Ramsha.Domain.Products.Enums;

namespace Ramsha.Application.Dtos.Inventory;

public class InventoryItemDiscount
{

}

public record DiscountRequest(
 decimal Value,
DateTime StartDate,
DateTime EndDate,
DiscountType Type
);
