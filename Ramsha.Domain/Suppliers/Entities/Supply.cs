using Ramsha.Domain.Common;
using Ramsha.Domain.Products.Enums;
using Ramsha.Domain.Suppliers.Enums;

namespace Ramsha.Domain.Suppliers.Entities;

public class Supply : BaseEntity
{
    public Supply(SupplyId id, SupplierId supplierId, Currency currency, SupplyStatus status)
    {
        Id = id;
        SupplierId = supplierId;
        Currency = currency;
        Status = status;
    }

    public static Supply Create(SupplierId supplierId, Currency currency = Currency.USD, SupplyStatus supplyStatus = SupplyStatus.Pending)
    {
        return new(new SupplyId(Guid.NewGuid()), supplierId, currency, supplyStatus);
    }

    public decimal Total { get; private set; }
    public int TotalQuantity { get; private set; }
    public SupplyId Id { get; private set; }
    public Currency Currency { get; private set; }
    public SupplierId SupplierId { get; private set; }
    public Supplier Supplier { get; private set; }
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
    }
    public void AddItem(SupplyItem item)
    {
        if (item.Quantity <= 0)
            return;

        Items ??= [];
        Items.Add(item);
    }

}
