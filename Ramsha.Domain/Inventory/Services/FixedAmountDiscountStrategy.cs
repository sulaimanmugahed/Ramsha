namespace Ramsha.Domain.Inventory.Services;

public class FixedAmountDiscountStrategy(decimal amount) : IDiscountStrategy
{
    public decimal ApplyDiscount(decimal originalPrice)
    {
        return originalPrice <=  amount ? 0 : originalPrice - amount;
    }
}
