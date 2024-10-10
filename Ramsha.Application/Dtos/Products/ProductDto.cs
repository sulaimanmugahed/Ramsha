using Ramsha.Domain.Products.Entities;


namespace Ramsha.Application.Dtos.Products;




public record ProductDto(
Guid Id,
string Name,
string Description,
DateTime Created,
string Status,
int TotalQuantity,
decimal BasePrice,
decimal FinalPrice,
string? ImageUrl,
string Category,
string Brand
);

public record CatalogProductDto(
Guid Id,
string Name,
string Category,
string Brand,
string? ImageUrl,
decimal BasePrice,
decimal FinalPrice,
int TotalQuantity,
decimal AverageRating,
int NumberOfRatings
);

public record CatalogVariantDto(
Guid Id,
string Name,
List<VariantValuesDto> VariantValues,
string ImageUrl,
List<InventoryCatalogDto> Inventories
);


public record InventoryCatalogDto(
 int AvailableQuantity,
 string SKU
);


public record ProductDetailsDto(
Guid Id,
string Name,
string Description,
decimal BasePrice,
CategoryDto Category,
BrandDto Brand,
string? ImageUrl,
string Status,
SeoSettings SeoSettings,
List<ProductVariantDto> Variants,
List<string> Tags
);


public record UpdateProductBasicCommand(
string? Name,
string? Description,
Guid? Category,
Guid? Brand,
string? ImageUrl
);

public record UpdateProductAdditionalCommand(
SeoSettings? SeoSettings,
List<string>? TagsToAdd,
List<string>? TagsToRemove
);




public record ProductCreatedDto(
    Guid Id,
    string Name,
    string Description
);





