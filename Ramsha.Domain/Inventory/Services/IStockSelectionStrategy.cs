
using Ramsha.Domain.Common;
using Ramsha.Domain.Inventory.Entities;

namespace Ramsha.Domain.Inventory.Services;

public interface IStockSelectionStrategy
{
    (int quantity, decimal wholesalePrice, decimal retailPrice, decimal finalPrice, string currency)? SelectStock(List<Stock> stockItems);
}

public class FIFOSelectionStrategy : IStockSelectionStrategy
{
    public (int quantity, decimal wholesalePrice, decimal retailPrice, decimal finalPrice, string currency)? SelectStock(List<Stock> stockItems)
    {
        if (stockItems.Count == 0) return null;

        var stock = stockItems.MinBy(x => x.Supplied);
        return (stock.Quantity, stock.WholesalePrice.Amount, stock.RetailPrice.Amount, stock.FinalPrice.Amount, stock.FinalPrice.Currency.ToString());
    }
}

public class LIFOSelectionStrategy : IStockSelectionStrategy
{
    public (int quantity, decimal wholesalePrice, decimal retailPrice, decimal finalPrice, string currency)? SelectStock(List<Stock> stockItems)
    {
        if (stockItems.Count == 0) return null;

        var stock = stockItems.MaxBy(x => x.Supplied);
        return (stock.Quantity, stock.WholesalePrice.Amount, stock.RetailPrice.Amount, stock.FinalPrice.Amount, stock.FinalPrice.Currency.ToString());
    }
}
