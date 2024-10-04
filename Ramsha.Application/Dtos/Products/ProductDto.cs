using Ramsha.Application.Dtos.Common;
using Ramsha.Domain.Products.Entities;
using Ramsha.Domain.Products.Enums;

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
decimal BasePrice,
CategoryDto Category,
BrandDto Brand,
string? ImageUrl,
string Status,
SeoSettings SeoSettings,
List<ProductVariantDto> Variants
);




public record ProductCreatedDto(
    Guid Id,
    string Name,
    string Description
);





