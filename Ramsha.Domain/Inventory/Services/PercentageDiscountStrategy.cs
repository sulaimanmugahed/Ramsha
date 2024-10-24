

using Ramsha.Domain.Common;

namespace Ramsha.Domain.Inventory.Services;

public class PercentageDiscountStrategy(decimal percentage) : IDiscountStrategy
{
    public Price ApplyDiscount(Price originalPrice)
    {
        var final = originalPrice.Amount - (originalPrice.Amount * percentage / 100);
        return new Price(final, originalPrice.Currency);
    }
}
