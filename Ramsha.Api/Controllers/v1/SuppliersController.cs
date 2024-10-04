using Asp.Versioning;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Features.Suppliers.Commands.AddSupplyRequestItem;
using Ramsha.Application.Features.Suppliers.Commands.Create;
using Ramsha.Application.Features.Suppliers.Commands.CreateSupplyRequest;
using Ramsha.Application.Features.Suppliers.Commands.SendSupplyRequest;
using Ramsha.Application.Features.Suppliers.Queries.GetSupplyRequestsBySupplier;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ramsha.Api.Controllers.v1;

[ApiVersion("1.0")]

public class SuppliersController : BaseApiController
{
	[HttpPost]
	public async Task<ActionResult<BaseResult<string>>> Create(CreateSupplierCommand command)
		=> await Mediator.Send(command);

	[HttpPost(nameof(CreateSupplyRequest))]
	public async Task<BaseResult<string?>> CreateSupplyRequest(CreateSupplyRequestCommand command)
	=> await Mediator.Send(command);

	[HttpPost(nameof(AddSupplyRequestItem))]
	public async Task<BaseResult<SupplyRequestDto>> AddSupplyRequestItem(AddSupplyRequestItemCommand command)
	=> await Mediator.Send(command);

	[HttpGet(nameof(GetSupplyRequestsBySupplier))]
	public async Task<BaseResult<List<SupplyRequestDto>>> GetSupplyRequestsBySupplier()
	=> await Mediator.Send(new GetSupplyRequestsBySupplierQuery());


	[HttpPost(nameof(SendSupplyRequest))]
	public async Task<BaseResult> SendSupplyRequest(SendSupplyRequestCommand command)
	=> await Mediator.Send(command);

}

