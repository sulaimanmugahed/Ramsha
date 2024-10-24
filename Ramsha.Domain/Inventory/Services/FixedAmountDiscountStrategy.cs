using Ramsha.Domain.Common;

namespace Ramsha.Domain.Inventory.Services;

public class FixedAmountDiscountStrategy(decimal amount) : IDiscountStrategy
{
    public Price ApplyDiscount(Price originalPrice)
    {
        if (originalPrice.Amount <= amount)
        {
            return new Price(0, originalPrice.Currency);
        }

        var discountedAmount = originalPrice.Amount - amount;
        return new Price(discountedAmount, originalPrice.Currency);
    }
}
