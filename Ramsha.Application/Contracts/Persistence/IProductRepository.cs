﻿using Ramsha.Application.Dtos.Products;
using Ramsha.Application.DTOs.Common;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Application.Contracts.Persistence;
public interface IProductRepository : IGenericRepository<Product, ProductId>
{
    Task<Product?> GetProductWithOptions(ProductId productId);
    Task<Product?> GetProductWithVariantsAndOptions(ProductId productId);

    Task<PaginationResponseDto<ProductDto>> GetProductsPaged(PaginationParams paginationParams, FilterParams? filterParams = null, SortingParams? sortingParams = null);
    Task<IEnumerable<Product>> GetAllProductsDetails();
    Task<Product?> GetProductDetails(ProductId productId);
    Task<Option?> GetProductOption(ProductId productId, OptionId optionId);
    Task<ProductVariant?> GetProductVariant(ProductId productId, ProductVariantId productVariantId);
    Task<ProductVariant?> GetVariantDetails(ProductId productId, ProductVariantId productVariantId);
    Task<IEnumerable<ProductVariant?>> GetVariantsDetails(ProductId productId);
    Task<bool> IsOptionExist(OptionId optionId);
    Task<IEnumerable<ProductVariant?>> GetVariants(ProductId productId);

    Task RemoveRange(List<ProductId> productIds);

    Task RemoveVariant(ProductVariant variant);
    Task<PaginationResponseDto<CatalogProductDto>> GetCatalogProductsPaged(PaginationParams paginationParams);
    Task<ProductVariant?> GetVariant(ProductId productId, ProductVariantId productVariantId);
}
