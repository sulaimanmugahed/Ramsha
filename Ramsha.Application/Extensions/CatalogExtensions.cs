
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

    //   Enumerable.Range(1, 10).Select(x => $"https://picsum.photos/200?random={x}")
    //         .Select(x => new Dtos.Products.ProductImageDto(x, false)).ToList()

    public static CatalogInventoryItemDetailDto AsCatalogInventoryItemDetailDto(this InventoryItem item)
    {
        return new CatalogInventoryItemDetailDto(
            item.Id.Value,
            item.SupplierId.Value,
            item.ProductVariantId.Value,
            item.AvailableQuantity,
            item.TotalQuantity,
            item.InventorySKU,
            item.RetailPrice.Amount,
            item.FinalPrice.Amount
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
        var TotalVariants = product.Inventories.DistinctBy(x => x.ProductVariantId).Count();
        var TotalSuppliers = product.Inventories.DistinctBy(x => x.SupplierId).Count();
        var minPrice = product.Inventories.MinBy(x => x.FinalPrice.Amount)?.FinalPrice.Amount ?? 0;
        var maxPrice = product.Inventories.MaxBy(x => x.FinalPrice.Amount)?.FinalPrice.Amount ?? 0;
        var availableQuantity = product.Inventories.Sum(x => x.AvailableQuantity);
        var totalQuantity = product.Inventories.Sum(x => x.TotalQuantity);

        return new CatalogProductDetailDto(
           product.Id.Value,
           product.Name,
           minPrice,
           maxPrice,
           product.Description,
           product.Category.Name,
           product.Brand?.Name,
           product.ImageUrl,
           totalQuantity,
           availableQuantity,
           product.AverageRating,
           product.NumberOfRatings,
           TotalVariants,
           TotalSuppliers
        );
    }
}
