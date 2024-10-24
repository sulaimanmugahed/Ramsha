
using Ramsha.Domain.Products.Enums;

namespace Ramsha.Domain.Products.Services;

public static class ProductPricingStrategyFactory
{
    public static IProductPricingStrategy Create(ProductPricingStrategy strategyType)
    {
        return strategyType switch
        {
            ProductPricingStrategy.MinPrice => new MinProductPriceStrategy(),
            ProductPricingStrategy.MaxPrice => new MaxProductPriceStrategy(),
            _ => throw new ArgumentException("Invalid product pricing strategy type"),
        };
    }

    public static object Create(object productPricingStrategy)
    {
        throw new NotImplementedException();
    }
}

