
using Ramsha.Domain.Products.Enums;

namespace Ramsha.Domain.Common;

public class Currency : BaseEntity
{
    private Currency() { }
    private Currency(CurrencyCode currency, decimal exchangeRate)
    {
        CurrencyCode = currency;
        ExchangeRate = exchangeRate;
    }

    public static Currency Create(CurrencyCode currency, decimal exchangeRate)
    {
        return new(currency, exchangeRate);
    }

    public void UpdateRate(decimal exchangeRate)
    {
        ExchangeRate = exchangeRate;
        LastUpdate = DateTime.UtcNow;
    }


    public int Id { get; set; }
    public CurrencyCode CurrencyCode { get; private set; }
    public decimal ExchangeRate { get; private set; }
    public DateTime LastUpdate { get; private set; }
}
