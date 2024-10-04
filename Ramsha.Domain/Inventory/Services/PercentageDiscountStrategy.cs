

namespace Ramsha.Domain.Inventory.Services;

public class PercentageDiscountStrategy(decimal percentage) : IDiscountStrategy
{
    public decimal ApplyDiscount(decimal originalPrice)
    {
        return originalPrice - (originalPrice * percentage / 100);
    }
}
