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

/// <summary>
/// Manages customer-related operations.
/// </summary>
[ApiVersion("1.0")]
[Authorize]
public class CustomersController : BaseApiController
{
	/// <summary>
	/// Retrieves a paged list of customers.
	/// </summary>
	/// <remarks>
	/// This endpoint returns a paginated list of customers based on the provided query parameters.
	/// </remarks>
	[HttpPost("paged")]
	public async Task<BaseResult<List<CustomerDto>>> GetPaged(GetCustomersPagedQuery query)
		=> await Mediator.Send(query);

	/// <summary>
	/// Creates or register new customer.
	/// </summary>
	/// <remarks>
	/// This endpoint create or register new customer account.
	/// Returns the ID of the newly created customer.
	/// </remarks>
	[AllowAnonymous]
	[HttpPost]
	public async Task<ActionResult<BaseResult<string>>> Create(CreateCustomerCommand command)
		=> await Mediator.Send(command);
}