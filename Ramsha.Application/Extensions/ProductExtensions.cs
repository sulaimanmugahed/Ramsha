
using Ramsha.Application.Dtos.Products;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Application.Extensions;

public static class ProductExtensions
{

   public static VariantDetailDto AsDetailsDto(this ProductVariant variant)
   {
      return new VariantDetailDto(
           variant.Id.Value,
           variant.SKU,
           variant.TotalQuantity,
           variant.Price,
           variant.FinalPrice,
           variant.VariantValues.Select(v => v.AsDto()).ToList(),
         variant.Images.Select(x => new ProductImageDto(x.Url, x.IsHome)).ToList()
        );
   }



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
         product.Price ?? 0,
         product.Category?.AsCategoryDto(),
         product.Brand?.AsDto(),
         product.ImageUrl,
         product.Status.ToString(),
         product.SeoSettings,
         variantsDetails
         );
   }


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
         variant.Name,
         variant.Description,
         variant.Price,
         variant.SKU,
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
