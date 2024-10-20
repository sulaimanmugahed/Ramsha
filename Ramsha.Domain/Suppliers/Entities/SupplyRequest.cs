using Ramsha.Domain.Common;
using Ramsha.Domain.Products.Enums;

namespace Ramsha.Domain.Suppliers.Entities;

public class SupplyRequest : BaseEntity
{

    private SupplyRequest(SupplyRequestId id, string supplier)
    {
        Id = id;
        Supplier = supplier;
    }
    public SupplyRequestId Id { get; set; }

    public Currency Currency { get; set; }

    public string Supplier { get; set; }

    public List<SupplyRequestItem> Items { get; set; } = [];

    public static SupplyRequest Create(string supplier)
    {
        return new(new SupplyRequestId(Guid.NewGuid()), supplier);
    }

    public void RemoveItem(SupplyRequestItemId itemId)
    {
        var item = Items.FirstOrDefault(x => x.Id == itemId);
        if (item is not null)
            Items.Remove(item);
    }

    public void AddItem(SupplyRequestItem item)
    {
        if (item.Quantity <= 0)
            return;

        Items.Add(item);
    }

}


