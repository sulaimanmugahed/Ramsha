
using Ramsha.Domain.Common;
using Ramsha.Domain.Products.Enums;
using Ramsha.Domain.Suppliers.Enums;

namespace Ramsha.Domain.Suppliers.Entities;

public class SupplyRequest : BaseEntity
{

    private SupplyRequest(SupplyRequestId id, string supplier, Currency currency)
    {
        Id = id;
        Supplier = supplier;
        Currency = currency;
    }
    public SupplyRequestId Id { get; set; }

    public Currency Currency { get; set; }

    public string Supplier { get; set; }

    public List<SupplyRequestItem> Items { get; set; } = [];

    public static SupplyRequest Create(string supplier, Currency currency = Currency.USD)
    {
        return new(new SupplyRequestId(Guid.NewGuid()), supplier, currency);
    }

    public void AddItem(SupplyRequestItem item)
    {
        if (item.Quantity <= 0)
            return;

        Items.Add(item);
    }

}


