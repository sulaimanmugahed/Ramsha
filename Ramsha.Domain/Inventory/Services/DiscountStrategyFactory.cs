
using Ramsha.Domain.Products.Entities;
using Ramsha.Domain.Products.Enums;

namespace Ramsha.Domain.Inventory.Services;

public static class DiscountStrategyFactory
{

    public static IDiscountStrategy? Create(Discount discount)
    {
        return discount.Type switch
        {
            DiscountType.Percentage => new PercentageDiscountStrategy(discount.Value),
            DiscountType.FixedAmount => new FixedAmountDiscountStrategy(discount.Value),
            _ => null
        };
    }


    public static IDiscountStrategy? Create(Coupon coupon)
    {
        return coupon.DiscountType switch
        {
            DiscountType.Percentage => new PercentageDiscountStrategy(coupon.DiscountValue),
            DiscountType.FixedAmount => new FixedAmountDiscountStrategy(coupon.DiscountValue),
            _ => null
        };
    }
}

