﻿using Asp.Versioning;
using Ramsha.Application.Dtos.Common;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Features.Products.Commands.AddProductOption;
using Ramsha.Application.Features.Products.Commands.AddProductVariant;
using Ramsha.Application.Features.Products.Commands.CreateProduct;
using Ramsha.Application.Features.Products.Commands.DeleteProductOption;
using Ramsha.Application.Features.Products.Commands.DeleteProductRange;
using Ramsha.Application.Features.Products.Commands.DeleteProductVariant;
using Ramsha.Application.Features.Products.Commands.UpdateProductVariant;
using Ramsha.Application.Features.Products.Queries.GetProductById;
using Ramsha.Application.Features.Products.Queries.GetProductOptions;
using Ramsha.Application.Features.Products.Queries.GetProductsDetails;
using Ramsha.Application.Features.Products.Queries.GetProductsPaged;
using Ramsha.Application.Features.Products.Queries.GetProductVariants;
using Ramsha.Application.Features.Products.Queries.GetVariantDetails;
using Ramsha.Application.Wrappers;
using Microsoft.AspNetCore.Mvc;
using Ramsha.Domain.Products.Enums;
using Ramsha.Application.Features.Products.Commands.UpdateProduct;
using Ramsha.Application.Features.Products.Queries.GetProductVariantSelection;
using Ramsha.Application.Features.Products.Queries.GetDefaultVariant;

namespace Ramsha.Api.Controllers.v1;

[ApiVersion("1.0")]
public class ProductsController : BaseApiController
{

    [HttpPost("paged")]
    public async Task<BaseResult<List<ProductDto>>> GetProductsPaged([FromBody] GetProductsPagedQuery query)
   => await Mediator.Send(query);

    [HttpGet("{productId}/selection")]
    public async Task<BaseResult<ProductVariantSelectionDto?>> GetProductVariantSelection(Guid productId, bool isCatalog)
    => await Mediator.Send(new GetProductVariantSelectionQuery { ProductId = productId, IsCatalog = isCatalog });

    [HttpGet("{productId}/options")]
    public async Task<BaseResult<List<ProductOptionDto>?>> GetProductOption(Guid productId)
    => await Mediator.Send(new GetProductOptionsQuery { ProductId = productId });

    [HttpGet("{productId}", Name = nameof(GetProduct))]
    public async Task<BaseResult<ProductDto?>> GetProduct(Guid productId)
   => await Mediator.Send(new GetProductByIdQuery { Id = productId });

    [HttpGet("{productId}/detail", Name = nameof(GetProductDetail))]
    public async Task<BaseResult<ProductDetailsDto?>> GetProductDetail(Guid productId)
=> await Mediator.Send(new GetProductDetailsQuery { ProductId = productId });

    [HttpDelete]
    public async Task<BaseResult> RemoveRange(DeleteProductRangeCommand command)
   => await Mediator.Send(command);


    [HttpPost]
    public async Task<ActionResult<BaseResult<string?>>> CreateProducts(CreateProductCommand command)
    {
        var result = await Mediator.Send(command);
        if (!result.Success)
            return result;

        return CreatedAtRoute(nameof(GetProduct), new { productId = result.Data }, result);
    }

    [HttpPost("{productId}/options/{optionId}")]
    public async Task<BaseResult> AddOption(Guid productId, Guid optionId)
    => await Mediator.Send(new AddProductOptionCommand { ProductId = productId, OptionId = optionId });

    [HttpDelete("{productId}/options/{optionId}")]
    public async Task<BaseResult> RemoveOption(Guid productId, Guid optionId)
    => await Mediator.Send(new DeleteProductOptionCommand { ProductId = productId, OptionId = optionId });

    [HttpPost("{productId}/variants")]
    public async Task<BaseResult> AddProductVariant(Guid productId, AddProductVariantCommand command)
    {
        command.ProductId = productId;
        return await Mediator.Send(command);
    }

    [HttpGet("{productId}/variants/default")]
    public async Task<BaseResult<ProductVariantDto?>> GetDefaultVariant(Guid productId)
    => await Mediator.Send(new GetDefaultVariantQuery { ProductId = productId });

    [HttpGet("{productId}/variants")]
    public async Task<BaseResult<List<ProductVariantDto?>>> GetVariantsForProduct(Guid productId)
   => await Mediator.Send(new GetProductVariantsQuery { ProductId = productId });

    [HttpGet("{productId}/variants/{variantId}")]
    public async Task<BaseResult<ProductVariantDto>> GetVariant(Guid productId, Guid variantId)
    => await Mediator.Send(new GetProductVariantQuery { ProductId = productId, VariantId = variantId });

    [HttpDelete("{productId}/variants/{variantId}")]
    public async Task<BaseResult> DeleteVariant(Guid productId, Guid variantId)
    => await Mediator.Send(new DeleteProductVariantCommand { ProductId = productId, VariantId = variantId });




    [HttpPut("{productId}")]
    public async Task<BaseResult> UpdateProduct(Guid productId, UpdateProductCommand command)
    {
        command.ProductId = productId;
        return await Mediator.Send(command);
    }

    [HttpPut("{productId}/variants/{variantId}")]
    public async Task<BaseResult> UpdateVariant(Guid productId, Guid variantId, UpdateProductVariantCommand command)
    {
        command.VariantId = variantId;
        command.ProductId = productId;
        return await Mediator.Send(command);
    }

    [HttpPut("{productId}/status")]

    public async Task<BaseResult> ChangeProductStatus([FromRoute] Guid productId, [FromQuery] ProductStatus statusValue)
    => await Mediator.Send(new ChangeProductStatusCommand { ProductId = productId, Status = statusValue });

}
