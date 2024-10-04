using Asp.Versioning;
using Ramsha.Api.Infrastructure.Extensions;
using Ramsha.Application.Dtos.Account.Requests;
using Ramsha.Application.Features.Customers.Commands.Create;
using Ramsha.Application.Wrappers;
using Microsoft.AspNetCore.Mvc;

namespace Ramsha.Api.Controllers.v1;

[ApiVersion("1.0")]
public class CustomersController:BaseApiController
{
	[HttpPost]
	public async Task<ActionResult<BaseResult<string>>> Create(CreateCustomerCommand command)
		=> await Mediator.Send(command);
	
}
