using Ramsha.Application.Dtos.Products;

namespace Ramsha.Application.Dtos.Suppliers;

public record SupplierProductDto(
    Guid ProductId,
    string Name,
    string Category,
    string Description,
    string? ImageUrl,
    int TotalVariants
);

public record SupplierVariantDto(
    Guid VariantId,
    string Sku,
    decimal WholesalePrice,
    decimal RetailPrice,
    string Description,
    List<ProductImageDto> VariantImages,
    List<VariantValuesDto> VariantValues
);

