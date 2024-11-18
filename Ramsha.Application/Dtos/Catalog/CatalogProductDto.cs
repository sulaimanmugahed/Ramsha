using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Dtos.Products;

namespace Ramsha.Application.Dtos.Catalog;


public record CatalogProductDto(
Guid Id,
string Name,
string Category,
string Brand,
string? ImageUrl,
decimal MinPrice,
decimal MaxPrice,
int TotalQuantity,
int AvailableQuantity,
decimal AverageRating,
int NumberOfRatings
);

public record CatalogProductDetailDto(
Guid Id,
string Name,
decimal MinPrice,
decimal MaxPrice,
string Description,
string Category,
string Brand,
string? ImageUrl,
int TotalQuantity,
int AvailableQuantity,
int TotalVariants,
int TotalSuppliers
);


public record CatalogVariantDto(
Guid Id,
List<CatalogVariantValuesDto> VariantValues
);

public record CatalogVariantDetailDto(
Guid Id,
string Sku,
List<CatalogVariantValuesDto> VariantValues
);

public record CatalogVariantValuesDto(
string OptionName,
string ValueName
);

public record CatalogInventoryItemDetailDto(
Guid Id,
Guid SupplierId,
Guid VariantId,
 int AvailableQuantity,
 int TotalQuantity,
 string Sku,
 decimal BasePrice,
 decimal FinalPrice,
 List<ProductImageDto> Images
);
public record CatalogSupplierDetailDto(
string FirstName,
string LastName
);


public class CatalogSupplierItemDetailDto(
    List<ProductImageDto> Images
);


