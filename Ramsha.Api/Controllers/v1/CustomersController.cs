using Asp.Versioning;
using Ramsha.Api.Infrastructure.Extensions;
using Ramsha.Application.Dtos.Account.Requests;
using Ramsha.Application.Features.Customers.Commands.Create;
using Ramsha.Application.Wrappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Ramsha.Domain.Constants;
using Ramsha.Application.Features.Customers.Queries.GetCurrentCustomerAddress;
using Ramsha.Domain.Customers.Entities;

namespace Ramsha.Api.Controllers.v1;

[ApiVersion("1.0")]
[Authorize(Roles = Roles.Customer)]

public class CustomersController : BaseApiController
{
	[HttpPost]
	public async Task<ActionResult<BaseResult<string>>> Create(CreateCustomerCommand command)
		=> await Mediator.Send(command);

	[HttpGet("address")]
	public async Task<ActionResult<BaseResult<CustomerAddress?>>> GetCurrentCustomerAddress()
		=> await Mediator.Send(new GetCurrentCustomerAddressQuery());

}
