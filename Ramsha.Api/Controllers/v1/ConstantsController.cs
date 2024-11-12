

using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Domain.Products.Enums;

namespace Ramsha.Api.Controllers.v1;

[ApiVersion("1.0")]

public class ConstantsController : BaseApiController
{
    [HttpGet]
    public string[] GetCurrencies()
     => Enum.GetValues(typeof(Currency))
     .Cast<Currency>()
     .Select(x => x.ToString())
     .ToArray();
}
