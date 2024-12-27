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
using Ramsha.Application.Dtos.Customers;
using Ramsha.Application.Features.Customers.Queries.GetCustomersPaged;

namespace Ramsha.Api.Controllers.v1;

[ApiVersion("1.0")]
[Authorize]

public class CustomersController : BaseApiController
{

	[HttpPost("paged")]
	public async Task<BaseResult<List<CustomerDto>>> GetPaged(GetCustomersPagedQuery query)
	=> await Mediator.Send(query);

	[AllowAnonymous]
	[HttpPost]
	public async Task<ActionResult<BaseResult<string>>> Create(CreateCustomerCommand command)
		=> await Mediator.Send(command);

}
