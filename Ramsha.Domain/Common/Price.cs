
using Ramsha.Domain.Products.Enums;

namespace Ramsha.Domain.Common;
public class Price : IEquatable<Price>
{
    public decimal Amount { get; }
    public Currency Currency { get; }

    private Price() { }

    public Price(decimal amount, Currency currency)
    {
        if (amount < 0)
            throw new ArgumentException("Amount cannot be negative.", nameof(amount));

        Amount = amount;
        Currency = currency;
    }


    public Price ConvertTo(Currency targetCurrency, decimal exchangeRate)
    {
        if (exchangeRate <= 0)
            throw new ArgumentException("Exchange rate must be greater than zero.", nameof(exchangeRate));

        decimal convertedAmount = Amount * exchangeRate;
        return new Price(convertedAmount, targetCurrency);
    }

    public override bool Equals(object? obj)
    {
        return Equals(obj as Price);
    }

    public bool Equals(Price? other)
    {
        if (other == null) return false;
        return Amount == other.Amount && Currency == other.Currency;
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Amount, Currency);
    }

    public override string ToString()
    {
        return $"{Amount} {Currency}";
    }
}
