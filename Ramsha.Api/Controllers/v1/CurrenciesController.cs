

using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Currencies;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products.Enums;

namespace Ramsha.Api.Controllers.v1;

[ApiVersion("1.0")]
public class CurrenciesController(ICurrencyRateRepository currencyRateRepository, IUnitOfWork unitOfWork) : BaseApiController
{
    [HttpGet]
    public async Task<BaseResult<List<CurrencyDto>>> GetAll()
    {
        var data = await currencyRateRepository.GetAllAsync();
        return data.Select(x => new CurrencyDto(x.CurrencyCode.ToString(), x.ExchangeRate)).ToList();
    }

    [HttpGet("{currencyCode}")]
    public async Task<BaseResult<CurrencyDto>> Get(CurrencyCode currencyCode)
    {
        var currency = await currencyRateRepository.GetAsync(x => x.CurrencyCode == currencyCode);
        if (currency is null)
            return new Error(ErrorCode.RequestedDataNotExist, "no currency found");
        return new CurrencyDto(currency.CurrencyCode.ToString(), currency.ExchangeRate);
    }

    [HttpPut("{currencyCode}")]
    
    public async Task<BaseResult> UpdateCurrencyRate(CurrencyCode currencyCode, decimal rate)
    {
        var currencyToUpdate = await currencyRateRepository.GetAsync(x => x.CurrencyCode == currencyCode);
        if (currencyToUpdate is null)
            return new Error(ErrorCode.RequestedDataNotExist, "no currency found");

        currencyToUpdate.UpdateRate(rate);
        await unitOfWork.SaveChangesAsync();
        return BaseResult.Ok();
    }



}
