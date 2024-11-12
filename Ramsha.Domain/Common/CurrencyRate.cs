
using Ramsha.Domain.Products.Enums;

namespace Ramsha.Domain.Common;

public class CurrencyRate : BaseEntity
{
    private CurrencyRate() { }
    private CurrencyRate(Currency currency, decimal exchangeRate)
    {
        Currency = currency;
        ExchangeRate = exchangeRate;
    }

    public static CurrencyRate Create(Currency currency, decimal exchangeRate)
    {
        return new(currency, exchangeRate);
    }

    public void UpdateRate(decimal exchangeRate)
    {
        ExchangeRate = exchangeRate;
        LastUpdate = DateTime.UtcNow;
    }


    public int Id { get; set; }
    public Currency Currency { get; private set; }
    public decimal ExchangeRate { get; private set; }
    public DateTime LastUpdate { get; private set; }
}
