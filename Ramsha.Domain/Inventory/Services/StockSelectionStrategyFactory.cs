
using Ramsha.Domain.Inventory.Enums;

namespace Ramsha.Domain.Inventory.Services;

public class StockSelectionStrategyFactory
{
    public static IStockSelectionStrategy Create(StockSelectionType stockSelectionType)
    {
        return stockSelectionType switch
        {
            StockSelectionType.LIFO => new LIFOSelectionStrategy(),
            _ => new FIFOSelectionStrategy()
        };
    }
}
