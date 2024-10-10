using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Features.Products.Queries.GetCatalogProductsPaged;
using Ramsha.Application.Wrappers;

namespace Ramsha.Api.Controllers.v1;

[ApiVersion("1.0")]

public class CatalogController : BaseApiController
{
    [HttpPost("products")]
    public async Task<BaseResult<List<CatalogProductDto>>> GetProductsPaged([FromBody] GetCatalogProductsPagedQuery query)
   => await Mediator.Send(query);


}
