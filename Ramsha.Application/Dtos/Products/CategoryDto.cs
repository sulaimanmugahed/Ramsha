

namespace Ramsha.Application.Dtos.Products;

public record CategoryDto(Guid Id, string Label, List<CategoryDto> Children);

