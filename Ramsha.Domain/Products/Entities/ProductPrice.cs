
using Ramsha.Domain.Common;
using Ramsha.Domain.Products.Enums;

namespace Ramsha.Domain.Products.Entities;

public class ProductPrice : BaseEntity, IAuditable
{
    public ProductPrice()
    {

    }
    private ProductPrice( decimal value, Currency currency, PriceType type, DateTime effectiveDate)
    {
        Value = value;
        Currency = currency;
        Type = type;
        EffectiveDate = effectiveDate;
    }

    public static ProductPrice Create(decimal value, Currency currency = Currency.USD, PriceType type = PriceType.Retail)
    {
        return new ProductPrice(value, currency, type, DateTime.UtcNow);
    }

    public decimal Value { get; set; }
    public Currency Currency { get; set; }
    public PriceType Type { get; set; }
    public DateTime EffectiveDate { get; set; }
    public Guid CreatedBy { get; set; }
    public DateTime Created { get; set; }
    public Guid? LastModifiedBy { get; set; }
    public DateTime? LastModified { get; set; }

}



