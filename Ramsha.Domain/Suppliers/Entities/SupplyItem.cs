

namespace Ramsha.Domain.Suppliers.Entities;

public class SupplyItem
{
    public SupplyItem()
    {

    }
    public SupplyItem(SupplyItemId id, ItemSupplied itemSupplied, decimal wholesalePrice, int quantity)
    {
        Id = id;
        ItemSupplied = itemSupplied;
        WholesalePrice = wholesalePrice;
        Quantity = quantity;
    }

    public static SupplyItem Create(ItemSupplied itemSupplied, decimal wholesalePrice, int quantity)
    {
        return new SupplyItem(new SupplyItemId(Guid.NewGuid()), itemSupplied, wholesalePrice, quantity);
    }

    public SupplyItemId Id { get; set; }

    public ItemSupplied ItemSupplied { get; set; }
    public decimal WholesalePrice { get; set; }
    public int Quantity { get; set; }


}



