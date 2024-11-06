
using Ramsha.Domain.Inventory;
using Ramsha.Domain.Suppliers;

namespace Ramsha.Domain.Orders.Entities;

public class ProductItemOrdered
{
    public ProductItemOrdered()
    {

    }

    public ProductItemOrdered(InventoryItemId inventoryItemId, string inventorySKU, string name, string pictureUrl)
    {
        InventoryItemId = inventoryItemId;
        Name = name;
        PictureUrl = pictureUrl ?? string.Empty;
        InventorySKU = inventorySKU;
    }

    public InventoryItemId InventoryItemId { get; set; }
    public string Name { get; set; }
    public string InventorySKU { get; set; }
    public string PictureUrl { get; set; }
}
