
using Ramsha.Domain.Products.Enums;

namespace Ramsha.Domain.Common;
public class Price : ValueObject
{
    public decimal Amount { get; }
    public CurrencyCode Currency { get; }

    protected Price() { }

    public Price(decimal amount, CurrencyCode currency = CurrencyCode.USD)
    {
        if (amount < 0)
            throw new ArgumentException("Amount cannot be negative.", nameof(amount));

        Amount = amount;
        Currency = currency;
    }


    public Price ConvertTo(CurrencyCode targetCurrency, decimal exchangeRate)
    {
        if (exchangeRate <= 0)
            throw new ArgumentException("Exchange rate must be greater than zero.", nameof(exchangeRate));

        decimal convertedAmount = Amount * exchangeRate;
        return new Price(convertedAmount, targetCurrency);
    }


    public override string ToString()
    {
        return $"{Amount} {Currency}";
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Amount;
        yield return Currency;
    }
}
