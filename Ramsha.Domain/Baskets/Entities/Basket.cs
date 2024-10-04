using Ramsha.Domain.Baskets;
using Ramsha.Domain.Baskets.Entities;
using Ramsha.Domain.Common;
using Ramsha.Domain.Inventory;
using Ramsha.Domain.Inventory.Entities;
using Ramsha.Domain.Products;
using Ramsha.Domain.Products.Entities;


namespace Ramsha.Domain.Customers.Entities;
public class Basket : BaseEntity
{
    public BasketId Id { get; set; }
    public string Buyer { get; set; }
    public List<BasketItem> Items { get; set; } = [];

    public static Basket Create(string buyer)
        => new()
        {
            Id = new BasketId(Guid.NewGuid()),
            Buyer = buyer,
        };

    public void AddItem(InventoryItem inventoryItem, int quantity)
    {
        var existItem = Items.FirstOrDefault(x => x.InventoryItemId == inventoryItem.Id);


        if (existItem is null)
        {
            Items.Add(new()
            {
                InventoryItem = inventoryItem,
                Quantity = quantity
            });
        }
        else
        {
            existItem.Quantity += quantity;
        }
    }

    public void RemoveItem(InventoryItemId inventoryItemId, int quantity)
    {
        var item = Items.FirstOrDefault(item => item.InventoryItemId == inventoryItemId);
        if (item is null) return;

        item.Quantity -= quantity;
        if (item.Quantity < 1)
        {
            Items.Remove(item);
        }
    }
}
