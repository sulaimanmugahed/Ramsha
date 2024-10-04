

namespace Ramsha.Domain.Inventory.Services;

public class DiscountChain
{
    private readonly List<(IDiscountStrategy Strategy, Func<bool>? Criteria)> _discountStrategies = [];
    public static DiscountChain Create()
    {
        return new();
    }

    public void AddDiscount(IDiscountStrategy discountStrategy, Func<bool>? Criteria = null)
    {
        _discountStrategies.Add((discountStrategy, Criteria));
    }

    public decimal ApplyDiscount(decimal price)
    {
        decimal finalPrice = price;
        foreach (var (strategy, criteria) in _discountStrategies)
        {
            if (criteria == null || criteria())
            {
                finalPrice = strategy.ApplyDiscount(finalPrice);
            }

        }
        return finalPrice;
    }


}
