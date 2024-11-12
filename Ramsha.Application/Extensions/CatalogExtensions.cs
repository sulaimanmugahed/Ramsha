
using Ramsha.Application.Dtos.Catalog;
using Ramsha.Domain.Common;
using Ramsha.Domain.Inventory.Entities;
using Ramsha.Domain.Products.Entities;
using Ramsha.Domain.Products.Enums;

namespace Ramsha.Application.Extensions;

public static class CatalogExtensions
{

    public static CatalogCategoryDto AsCatalogCategoryDto(this Category category)
    {

        return new CatalogCategoryDto(
            category.Id.Value,
            category.ParentCategoryId?.Value,
            category.Name,
            $"https://picsum.photos/200?random={category.Id.Value}",
            category.Products.Count,
            category.SubCategories?.Count > 0
        );
    }
    public static CatalogProductDto AsProductCatalogDto(this Product product)
    {
        var basePrice = product.Price ?? 0;
        var minPrice = product.Inventories.MinBy(x => x.FinalPrice.Amount)?.FinalPrice.Amount ?? 0;
        var maxPrice = product.Inventories.MaxBy(x => x.FinalPrice.Amount)?.FinalPrice.Amount ?? 0;

        return new CatalogProductDto(
           product.Id.Value,
           product.Name,
           product.Category.Name,
           product.Brand?.Name,
           product.ImageUrl,
           minPrice,
           maxPrice,
           basePrice,
           product.FinalPrice ?? basePrice,
           product.TotalQuantity,
           product.AverageRating,
           product.NumberOfRatings
        );
    }

    public static CatalogInventoryItemDetailDto AsCatalogInventoryItemDetailDto(this InventoryItem item)
    {
        return new CatalogInventoryItemDetailDto(
            item.Id.Value,
            item.AvailableQuantity,
            item.InventorySKU,
            item.RetailPrice.Amount,
            item.FinalPrice.Amount,
            Enumerable.Range(1, 10).Select(x => $"https://picsum.photos/200?random={x}")
            .Select(x => new Dtos.Products.ProductImageDto(x, false)).ToList()
        );
    }


    public static CatalogVariantDto AsCatalogVariantDto(this ProductVariant variant)
    => new CatalogVariantDto(
        variant.Id.Value,
        variant.VariantValues.Select(x => new CatalogVariantValuesDto(x.Option.Name, x.OptionValue.Name)).ToList()
    );

    public static CatalogVariantDetailDto AsCatalogVariantDetailDto(this ProductVariant variant)
    {
        return new CatalogVariantDetailDto(
            variant.Id.Value,
            variant.Code,
            variant.VariantValues.Select(x => new CatalogVariantValuesDto(x.Option.Name, x.OptionValue.Name)).ToList()
        );
    }


    public static CatalogProductDetailDto AsCatalogProductDetailDto(this Product product)
    {
        var basePrice = product.Price ?? 0;

        return new CatalogProductDetailDto(
           product.Id.Value,
           product.Name,
           product.Description,
           product.Category.Name,
           product.Brand?.Name,
           product.ImageUrl,
           product.TotalQuantity,
           product.AverageRating,
           product.NumberOfRatings
        );
    }
}
