using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Dtos.Supplies;
using Ramsha.Application.Features.Inventory.Commands.ApproveSupplyRequest;
using Ramsha.Application.Features.Suppliers.Queries.GetSuppliesPaged;
using Ramsha.Application.Features.Supplies.Queries.GetSupplyDetail;
using Ramsha.Application.Wrappers;

namespace Ramsha.Api.Controllers.v1;


[ApiVersion("1.0")]

public class SuppliesController : BaseApiController
{
    [HttpPost("paged")]
    public async Task<BaseResult<List<SupplyDto>>> GetCurrentSupplierSupplies([FromBody] GetSuppliesPagedQuery query)
    => await Mediator.Send(query);

    [HttpGet("{id}/detail")]
    public async Task<BaseResult<SupplyDetailDto?>> GetDetail(Guid id)
   => await Mediator.Send(new GetSupplyDetailQuery { Id = id });

    [HttpPost("{id}/approve")]
    public async Task<BaseResult> ApproveSupply(Guid id)
   => await Mediator.Send(new ApproveSupplyCommand { SupplyId = id });


}
