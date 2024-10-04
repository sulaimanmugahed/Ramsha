

namespace Ramsha.Application.Dtos.Common;

public record OptionDto(
Guid Id,
string Name,
List<OptionValueDto> Values);

public record OptionValueDto(
Guid Id,
string Name);


