using Bogus;
using Ramsha.Application.UnitTest.Extensions;
using Ramsha.Domain.Products;
using Ramsha.Domain.Products.Entities;


namespace Ramsha.Application.UnitTest.DataGenretors;


public class ProdutsDataGenerator
{
    public static List<Product> GenerateProductList(int count, bool useNewSeed = false)
    {
        return GetProductFacker(useNewSeed).Generate(count);
    }

    public static Product GenerateProduct(bool useNewSeed = false)
    {
        return GenerateProductList(1, useNewSeed).Single();
    }

    private static Faker<Product> GetProductFacker(bool useNewSeed)
    {
        var seed = 0;
        if (useNewSeed)
        {
            seed = Random.Shared.Next(10, int.MaxValue);
        }

        return new Faker<Product>()
            .UsePrivateConstractor()
            .RuleFor(p => p.Id, f => new ProductId(f.Random.Guid()))
            .RuleFor(p => p.Name, f => f.Commerce.ProductName())
            .RuleFor(p => p.Description, f => f.Commerce.ProductDescription())
            .RuleFor(p => p.Price, f => f.Random.Decimal(0m, decimal.MaxValue))
            .UseSeed(seed);
    }
}
