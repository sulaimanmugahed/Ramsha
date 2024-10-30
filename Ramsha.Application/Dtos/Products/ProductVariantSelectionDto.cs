namespace Ramsha.Application.Dtos.Products;

public record ProductVariantSelectionDto(
List<SelectableVariantsDto> Variants,
List<string> AvailableOptionsNames
);

public record SelectableVariantsDto(
Guid Id,
List<SelectableVariantValuesDto> VariantValues
);

public record SelectableVariantValuesDto(
string OptionName,
string ValueName
);

