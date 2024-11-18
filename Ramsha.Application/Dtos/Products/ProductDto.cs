using Ramsha.Domain.Products.Entities;


namespace Ramsha.Application.Dtos.Products;




public record ProductDto(
Guid Id,
string Name,
string Description,
DateTime Created,
string Status,
string? ImageUrl,
string Category,
string Brand
);






public record ProductDetailsDto(
Guid Id,
string Name,
string Description,
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





