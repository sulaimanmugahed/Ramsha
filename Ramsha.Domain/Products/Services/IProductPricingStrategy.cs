using Ramsha.Domain.Common;
using Ramsha.Domain.Inventory.Entities;
using Ramsha.Domain.Products.Entities;
using Ramsha.Domain.Suppliers.Entities;

namespace Ramsha.Domain.Products.Services;

public interface IProductPricingStrategy
{
    (Price, Price)? CalculatePrice(List<InventoryItem> items);

}
