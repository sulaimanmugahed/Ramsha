using Ramsha.Domain.Common;
using Ramsha.Domain.Products.Enums;
using Ramsha.Domain.Suppliers.Enums;

namespace Ramsha.Domain.Suppliers.Entities;

public class Supply : BaseEntity
{
    public Supply(SupplyId id, string supplier, CurrencyCode currency)
    {
        Id = id;
        Supplier = supplier;
        Currency = currency;
    }

    public static Supply Create(string supplier, CurrencyCode currency = CurrencyCode.USD)
    {
        var supply = new Supply(new SupplyId(Guid.NewGuid()), supplier, currency);
        supply.SetStatus(SupplyStatus.Pending);
        return supply;
    }

    public DateTime Sent { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public DateTime? RejectAt { get; set; }
    public decimal Total { get; private set; }
    public int TotalQuantity { get; private set; }
    public SupplyId Id { get; private set; }
    public CurrencyCode Currency { get; private set; }
    public string Supplier { get; private set; }
    public List<SupplyItem> Items { get; private set; }
    public SupplyStatus Status { get; private set; }

    public void SetTotal(decimal total, int quantity)
    {
        Total = total;
        TotalQuantity = quantity;
    }

    public void SetStatus(SupplyStatus status)
    {
        Status = status;
        var currentData = DateTime.UtcNow;
        if (Status == SupplyStatus.Rejected) RejectAt = currentData;
        else if (Status == SupplyStatus.Approved) ApprovedAt = currentData;
        else Sent = currentData;
    }
    public void AddItem(SupplyItem item)
    {
        if (item.Quantity <= 0)
            return;

        Items ??= [];
        Items.Add(item);
    }

}
