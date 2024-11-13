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
using Ramsha.Application.Features.Catalog.Queries.GetCatalogProductVariant;


namespace Ramsha.Api.Controllers.v1;

[ApiVersion("1.0")]

public class CatalogController : BaseApiController
{
    [HttpPost("products")]
    public async Task<BaseResult<List<CatalogProductDto>>> GetProductsPaged([FromBody] GetCatalogProductsPagedQuery query)
   => await Mediator.Send(query);

    [HttpGet("products/{productId}")]
    public async Task<BaseResult<CatalogProductDetailDto>> GetProductCatalogDetail(Guid productId)
    => await Mediator.Send(new GetCatalogProductDetailQuery { ProductId = productId });

    [HttpGet("products/{productId}/variants/{variantId?}")]
    public async Task<BaseResult<CatalogVariantDto?>> GetCatalogProductVariant(Guid productId, Guid? variantId = null)
    => await Mediator.Send(new GetCatalogProductVariantQuery { ProductId = productId, ProductVariantId = variantId });


    [HttpGet("categories")]
    public async Task<BaseResult<List<CatalogCategoryDto>>> GetCatalogCategories()
    => await Mediator.Send(new GetCatalogCategoriesQuery());



    [HttpPost("{productId}/inventoryItems/{productVariantId?}")]
    public async Task<BaseResult<List<CatalogInventoryItemDetailDto>>> GetInventoryItems(Guid productId, [FromBody] GetCatalogInventoryItemsQuery query, Guid? productVariantId = null)
    {
        query.ProductId = productId;
        query.ProductVariantId = productVariantId;
        return await Mediator.Send(query);
    }




}
