using Microsoft.Extensions.Options;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Common;
using Ramsha.Domain.Products.Enums;
using Ramsha.Domain.Settings;

namespace Ramsha.Application.Services;

public class CurrencyExchangeService(ICurrencyRateRepository currencyRateRepository, IOptionsSnapshot<CurrencySettings> settings)
{

    public async Task<decimal> ConvertFrom(decimal amount, CurrencyCode fromCurrency)
    {
        if (amount <= 0)
            throw new ArgumentException("Amount must be greater than zero.", nameof(amount));

        var fromRate = await currencyRateRepository.GetAsync(x => x.CurrencyCode == fromCurrency);
        if (fromRate is null)
            throw new Exception($"{fromCurrency} not found");

        decimal exchangedAmount = amount * fromRate.ExchangeRate;

        return exchangedAmount;
    }


    public async Task<decimal> Exchange(decimal amount, CurrencyCode fromCurrency, CurrencyCode toCurrency)
    {
        if (amount <= 0)
            throw new ArgumentException("Amount must be greater than zero.", nameof(amount));

        var fromRate = await currencyRateRepository.GetAsync(x => x.CurrencyCode == fromCurrency);
        if (fromRate is null)
            throw new Exception($"{fromCurrency} not found");

        var toRate = await currencyRateRepository.GetAsync(x => x.CurrencyCode == toCurrency);
        if (toRate is null)
            throw new Exception($"{toRate} not found");

        if (fromRate.ExchangeRate == 0 || toRate.ExchangeRate == 0)
            throw new InvalidOperationException("Invalid exchange rate.");

        decimal exchangedAmount = (amount / fromRate.ExchangeRate) * toRate.ExchangeRate;

        return exchangedAmount;
    }
}
