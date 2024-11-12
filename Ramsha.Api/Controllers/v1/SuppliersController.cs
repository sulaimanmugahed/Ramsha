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
using Ramsha.Application.Features.Suppliers.Queries.GetCurrentSupplierSupplyRequest;
using Ramsha.Application.Features.Suppliers.Commands.RemoveSupplyRequestItem;
using Ramsha.Application.Features.Suppliers.Queries.GetSupplyRequestItem;
using Ramsha.Application.Features.Suppliers.Queries.GetSupplierInventoryItems;
using Ramsha.Application.Features.Suppliers.Commands.AddSupplierVariant;
using Ramsha.Application.Features.Suppliers.Queries.GetCurrentSupplierProducts;
using Ramsha.Application.Features.Suppliers.Queries.GetCurrentSupplierProductVariant;
using Ramsha.Application.Features.Suppliers.Queries.GetCurrentSupplierProductVariantList;
using Ramsha.Application.Features.Suppliers.Commands.UpdateSupplierVariant;
using Ramsha.Application.Dtos.Supplies;

namespace Ramsha.Api.Controllers.v1;

[ApiVersion("1.0")]
[Authorize(Roles = Roles.Supplier)]
public class SuppliersController : BaseApiController
{
	[HttpPost("products/{productId}/variants/{variantId}")]
	public async Task<BaseResult> CreateProduct(Guid productId, Guid variantId, AddSupplierVariantCommand command)
	{
		command.ProductId = productId;
		command.ProductVariantId = variantId;
		return await Mediator.Send(command);
	}

	[HttpPost("products/paged")]
	public async Task<BaseResult<List<SupplierProductDto>>> GetCurrentSupplierProducts(GetCurrentSupplierProductsQuery query)
	=> await Mediator.Send(query);

	[HttpGet("products/{productId}/variants/{variantId}")]
	public async Task<BaseResult<SupplierVariantDto?>> GetCurrentSupplierVariant(Guid productId, Guid variantId)
	=> await Mediator.Send(new GetCurrentSupplierProductVariantQuery { ProductId = productId, VariantId = variantId });

	[HttpGet("products/{productId}/variants/")]
	public async Task<BaseResult<List<SupplierVariantDto>>> GetCurrentSupplierVariants(Guid productId)
	=> await Mediator.Send(new GetCurrentSupplierProductVariantListQuery { ProductId = productId });

	[HttpPut("products/{productId}/variants/{variantId}")]
	public async Task<BaseResult> UpdateVariant(Guid productId, Guid variantId, UpdateSupplierVariantCommand command)
	{
		command.ProductId = productId;
		command.VariantId = variantId;
		return await Mediator.Send(command);
	}

	[HttpGet("supply-request")]
	public async Task<BaseResult<SupplyRequestDto?>> SupplyRequest()
	=> await Mediator.Send(new GetCurrentSupplierSupplyRequestQuery());

	[HttpPost, AllowAnonymous]
	public async Task<ActionResult<BaseResult<string>>> Create(CreateSupplierCommand command)
		=> await Mediator.Send(command);

	[HttpPost(nameof(CreateSupplyRequest))]
	public async Task<BaseResult<string?>> CreateSupplyRequest(CreateSupplyRequestCommand command)
	=> await Mediator.Send(command);

	[HttpPost("supply-request/items")]
	public async Task<BaseResult<SupplyRequestDto>> AddOrUpdateSupplyRequestItem(AddOrUpdateSupplyRequestItemCommand command)
	=> await Mediator.Send(command);


	[HttpPost("supplies")]
	public async Task<BaseResult<List<SupplyDto>>> GetCurrentSupplierSupplies([FromBody] GetCurrentSupplierSuppliesQuery query)
	=> await Mediator.Send(query);

	[HttpDelete("supply-request/items/{id}")]
	public async Task<BaseResult> AddSupplyRequestItem(Guid id)
	=> await Mediator.Send(new RemoveSupplyRequestItemCommand { SupplyRequestItemId = id });

	[HttpGet("supply-request/items/{id}")]
	public async Task<BaseResult> GetSupplyRequestItem(Guid id)
	=> await Mediator.Send(new GetSupplyRequestItemQuery { SupplyRequestItemId = id });


	[HttpPost("supply-request/send")]
	public async Task<BaseResult> SendSupplyRequest(SendSupplyRequestCommand command)
	=> await Mediator.Send(command);

	[HttpGet("inventory/items")]
	public async Task<BaseResult> GetInventoryItems()
	=> await Mediator.Send(new GetSupplierInventoryItemsQuery());





}

