namespace Ramsha.Domain.Inventory.Entities;

public class InventoryItemImage
{
    public int Id { get; set; }
    public InventoryItemId InventoryItemId { get; set; }
    public InventoryItem InventoryItem { get; set; }
    public string Url { get; set; }
    public string Path { get; set; }
    public bool IsHome { get; set; }
}
