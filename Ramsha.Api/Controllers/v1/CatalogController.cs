using Asp.Versioning;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Application.Dtos.Catalog;
using Ramsha.Application.Features.Catalog.Queries.GetCatalogCategories;
using Ramsha.Application.Features.Catalog.Queries.GetCatalogInventoryItems;
using Ramsha.Application.Features.Catalog.Queries.GetCatalogProductDetail;
using Ramsha.Application.Features.Products.Queries.GetCatalogProductsPaged;
using Ramsha.Application.Wrappers;
using Microsoft.AspNetCore.Authorization;


namespace Ramsha.Api.Controllers.v1;

[ApiVersion("1.0")]

public class CatalogController : BaseApiController
{
    [Authorize]
    [HttpPost("products")]
    public async Task<BaseResult<List<CatalogProductDto>>> GetProductsPaged([FromBody] GetCatalogProductsPagedQuery query)
   => await Mediator.Send(query);

    [HttpGet("products/{productId}")]
    public async Task<BaseResult<CatalogProductDetailDto>> GetProductCatalogDetail(Guid productId)
    => await Mediator.Send(new GetCatalogProductDetailQuery { ProductId = productId });

    [HttpGet("categories")]
    public async Task<BaseResult<List<CatalogCategoryDto>>> GetCatalogCategories()
    => await Mediator.Send(new GetCatalogCategoriesQuery());

    [HttpPost("{productId}/{productVariantId}/inventoryItems")]
    public async Task<BaseResult<List<CatalogInventoryItemDetailDto>>> GetInventoryItems(Guid productId, Guid productVariantId, [FromBody] GetCatalogInventoryItemsQuery query)
    {
        query.ProductId = productId;
        query.ProductVariantId = productVariantId;
        return await Mediator.Send(query);
    }




}
