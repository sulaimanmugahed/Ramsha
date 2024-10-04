using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Domain.Inventory.Services;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Domain.Common;

public class DiscountService : IDiscountService
{
    public decimal GetDiscountedPrice(List<Discount> discounts, decimal price)
    {
        decimal finalPrice = price;

        if (discounts.Count > 0)
        {
            var discountChain = DiscountChain.Create();

            foreach (var discount in discounts)
            {
                var strategy = DiscountStrategyFactory.Create(discount);

                if (strategy is not null)
                    discountChain.AddDiscount(strategy);

            }
            finalPrice = discountChain.ApplyDiscount(finalPrice);

        }
        return finalPrice;
    }
}
