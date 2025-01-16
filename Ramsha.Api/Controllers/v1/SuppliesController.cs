using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Dtos.Supplies;
using Ramsha.Application.Features.Inventory.Commands.ApproveSupplyRequest;
using Ramsha.Application.Features.Suppliers.Queries.GetSuppliesPaged;
using Ramsha.Application.Features.Supplies.Queries.GetSupplyDetail;
using Ramsha.Application.Wrappers;

namespace Ramsha.Api.Controllers.v1;

/// <summary>
/// Manages supply-related operations.
/// </summary>
[ApiVersion("1.0")]
public class SuppliesController : BaseApiController
{
    /// <summary>
    /// Retrieves a paged list of supplies.
    /// </summary>
    /// <remarks>
    /// This endpoint returns a paginated list of supplies based on the provided query parameters.
    /// </remarks>
    [HttpPost("paged")]
    public async Task<BaseResult<List<SupplyDto>>> GetCurrentSupplierSupplies([FromBody] GetSuppliesPagedQuery query)
        => await Mediator.Send(query);

    /// <summary>
    /// Retrieves details of a specific supply.
    /// </summary>
    /// <remarks>
    /// This endpoint returns the details of a supply identified by its unique ID.
    /// </remarks>
    [HttpGet("{id}/detail")]
    public async Task<BaseResult<SupplyDetailDto?>> GetDetail(Guid id)
        => await Mediator.Send(new GetSupplyDetailQuery { Id = id });

    /// <summary>
    /// Approves a supply request.
    /// </summary>
    /// <remarks>
    /// This endpoint approves a supply request identified by its unique ID.
    /// </remarks>
    [HttpPost("{id}/approve")]
    public async Task<BaseResult> ApproveSupply(Guid id)
        => await Mediator.Send(new ApproveSupplyCommand { SupplyId = id });
}