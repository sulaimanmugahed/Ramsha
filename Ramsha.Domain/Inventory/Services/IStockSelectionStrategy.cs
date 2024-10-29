
using Ramsha.Domain.Common;
using Ramsha.Domain.Inventory.Entities;

namespace Ramsha.Domain.Inventory.Services;

public interface IStockSelectionStrategy
{
    Stock? SelectStock(List<Stock> stockItems);
}

public class FIFOSelectionStrategy : IStockSelectionStrategy
{
    public Stock? SelectStock(List<Stock> stockItems)
    {
        if (stockItems.Count == 0) return null;

        var stock = stockItems.MinBy(x => x.Supplied);
        return stock;
    }
}


public class LIFOSelectionStrategy : IStockSelectionStrategy
{
    public Stock? SelectStock(List<Stock> stockItems)
    {
        if (stockItems.Count == 0) return null;

        var stock = stockItems.MaxBy(x => x.Supplied);
        return stock;
    }
}