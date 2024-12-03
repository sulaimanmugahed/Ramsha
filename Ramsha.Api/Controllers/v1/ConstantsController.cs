

using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Application.Contracts;
using Ramsha.Domain.Products.Enums;

namespace Ramsha.Api.Controllers.v1;

[ApiVersion("1.0")]

public class ConstantsController(IEmailService emailService) : BaseApiController
{
    [HttpGet]
    public string[] GetCurrencies()
     => Enum.GetValues(typeof(CurrencyCode))
     .Cast<CurrencyCode>()
     .Select(x => x.ToString())
     .ToArray();


    [HttpPost("TestEmail")]
    public async Task<IActionResult> TestEmail()
    {
        await emailService.SendEmailMessage(new Application.Contracts.Email.EmailMessage(
            ["hg123om5@gmail.com", "sulaimanmugahed@gmail.com"], "For Test", "this is test message"
        ));

        return Ok();
    }
}
