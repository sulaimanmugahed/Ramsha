

using Ramsha.Application.Dtos.Common;
using Ramsha.Application.Dtos.Storage;

namespace Ramsha.Application.Dtos.Products;

public record ProductVariantDto(
    Guid Id,
    string Name,
    string Description,
    decimal BasePrice,
    string SKU,
    List<VariantValuesDto> VariantValues,
    List<ProductImageDto> VariantImages);


public record VariantValuesDto(
Guid OptionId,
Guid OptionValueId,
string? OptionName,
string? ValueName
);


public record VariantDetailDto(
    
Guid Id,
string SKU,
int Quantity,
decimal BasePrice,
decimal DiscountedPrice,
List<VariantValuesDto> Values,
List<ProductImageDto> VariantImages);




public record VariantValuesCommand(Guid Option, Guid Value);
public record VariantCommand(string? Name, string? Description, decimal? BasePrice, List<VariantValuesCommand> VariantValues, List<ImageRequest> VariantImages);




public class NewVariantDto
{
    public string Name { get; set; }
    public decimal? BasePrice { get; set; }
    public List<VariantValueDto> VariantValues { get; set; } = new();
    public List<ImageDto> VariantImages { get; set; } = new();
}

public class UpdateVariantDto
{
    public Guid VariantId { get; set; }
    public string Name { get; set; }
    public decimal? BasePrice { get; set; }
    public List<VariantValueDto> VariantValues { get; set; } = new();
}

public class VariantValueDto
{
    public int Option { get; set; }
    public int Value { get; set; }
}

public class ImageDto
{
    public string Url { get; set; }
    public string FullPath { get; set; }
}

public class NewImageDto
{
    public Guid VariantId { get; set; }
    public string Url { get; set; }
    public string FullPath { get; set; }
}





