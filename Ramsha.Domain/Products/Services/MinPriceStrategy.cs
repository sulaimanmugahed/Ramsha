using Ramsha.Domain.Common;
using Ramsha.Domain.Inventory.Entities;
using Ramsha.Domain.Products.Entities;
using Ramsha.Domain.Suppliers.Entities;

namespace Ramsha.Domain.Products.Services;

public class MinProductPriceStrategy : IProductPricingStrategy
{
    public (Price, Price)? CalculatePrice(List<InventoryItem> items)
    {
        if (items.Count == 0) return null;

        var inventory = items.MinBy(i => i.FinalPrice);

        return (inventory?.RetailPrice ?? new(0), inventory?.FinalPrice ?? new(0));

    }
}

