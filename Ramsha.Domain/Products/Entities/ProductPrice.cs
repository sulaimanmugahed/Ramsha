
using Ramsha.Domain.Common;
using Ramsha.Domain.Products.Enums;

namespace Ramsha.Domain.Products.Entities;

public class ProductPrice
{
    public ProductPrice()
    {

    }
    private ProductPrice(decimal value, Currency currency)
    {
        Value = value;
        Currency = currency;
    }

    public static ProductPrice Create(decimal value, Currency currency = Currency.USD)
    {
        return new ProductPrice(value, currency);
    }

    public decimal Value { get; set; }
    public Currency Currency { get; set; }

}



