using Ramsha.Domain.Inventory;

namespace Ramsha.Domain.Suppliers.Entities;

public class FulfillmentRequestItem
{
    public InventoryItemId InventoryItemId { get; set; }
    public string Sku { get; set; }
    public string Name { get; set; }
    public string ImageUrl { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}
