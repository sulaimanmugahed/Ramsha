
using System.Security.Cryptography.X509Certificates;
using Ramsha.Application.Dtos.Products;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Application.Extensions;

public static class ProductExtensions
{
   public static SelectableVariantValuesDto AsSelectableVariantValuesDto(this VariantValue variantValue)
   => new(variantValue.Option.Name, variantValue.OptionValue.Name);


   public static SelectableVariantsDto AsSelectableVariantsDto(this ProductVariant productVariant)
   => new SelectableVariantsDto(
      productVariant.Id.Value,
   productVariant.VariantValues.Select(x => x.AsSelectableVariantValuesDto()).ToList());


   public static ProductVariantSelectionDto AsProductVariantSelectionDto(this Product product, bool isCatalog = false)
   {
      var variants = product.Variants.Where(x => isCatalog ? x.InventoryItems.Any() : true);
      return new(
         variants.Select(x => x.AsSelectableVariantsDto()).ToList(),
         variants.SelectMany(x => x.VariantValues).DistinctBy(x => x.Option.Name).Select(x => x.Option.Name).ToList()
      );
   }


   public static VariantDetailDto AsDetailsDto(this ProductVariant variant)
   {
      return new VariantDetailDto(
           variant.Id.Value,
           variant.Code,
           variant.ImageUrl,
           variant.VariantValues.Select(v => v.AsDto()).ToList(),
         variant.Images.Select(x => new ProductImageDto(x.Url, x.IsHome)).ToList()
        );
   }


   public static ProductOptionDto AsProductOption(this ProductOption productOption)
   => new(productOption.OptionId.Value, productOption.Option.Name, productOption.Priority);



   public static BrandDto AsDto(this Brand brand)
   {
      return new BrandDto(brand.Id.Value, brand.Name);
   }

   public static TagDto AsDto(this Tag tag)
   {
      return new TagDto(tag.Name);
   }


   public static ProductDetailsDto AsDetailsDto(this Product product)
   {
      var variants = product.Variants;

      var variantsDetails = variants
      .Select(v => v.AsDto())
      .ToList();

      return new ProductDetailsDto(
         product.Id.Value,
         product.Name,
         product.Description,
         product.Category?.AsCategoryDto(),
         product.Brand?.AsDto(),
         product.ImageUrl,
         product.Status.ToString(),
         product.SeoSettings,
         variantsDetails,
         product.Tags.Select(t => t.Tag.Name).ToList()
         );
   }





   // public static CatalogVariantDto AsCatalogVariantDto(this ProductVariant variant)
   // {
   //    return new CatalogVariantDto(
   //       variant.Id.Value,
   //       variant.Name,
   //       variant.VariantValues.Select(x => x.AsDto()).ToList(),
   //       variant.Images.FirstOrDefault(x => x.IsHome)?.Url,
   //       variant.InventoryItems.Select(x => new InventoryCatalogDto(
   //          x.Quantity,
   //          x.InventorySKU,
   //          x.RetailPrice,
   //          x.FinalPrice
   //       )).ToList()
   //    );
   // }





   public static ProductDto AsDto(this Product product)
   {
      return new ProductDto(
         product.Id.Value,
         product.Name,
         product.Description,
         product.Created,
         product.Status.ToString(),
         product.ImageUrl,
         product.Category.Name,
         product.Brand?.Name
      );
   }


   public static ProductCreatedDto AsCreatedProductDto(this Product product)
   {
      return new ProductCreatedDto(
         product.Id.Value,
         product.Name,
         product.Description
      );
   }


   public static CategoryDto AsCategoryDto(this Category category)
   => new(
    category.Id.Value,
    category.Name,
    category.SubCategories.Select(c => c.AsCategoryDto()).ToList());



   public static ProductVariantDto AsDto(this ProductVariant variant)
   {
      return new ProductVariantDto(
         variant.Id.Value,
         variant.IsDefault,
         variant.Code,
         variant.ImageUrl,
         variant.VariantValues.Select(v => v.AsDto()).ToList(),
         variant.Images.Select(x => new ProductImageDto(x.Url, x.IsHome)).ToList()
      );
   }

   public static VariantValuesDto AsDto(this VariantValue value)
   => new(
      value.OptionId.Value,
      value.OptionValueId.Value,
      value?.Option.Name,
      value?.OptionValue.Name);
}
