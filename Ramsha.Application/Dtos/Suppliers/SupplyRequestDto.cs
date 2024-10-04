


namespace Ramsha.Application.Dtos.Suppliers;

public record SupplyRequestDto(
    Guid Id,
    List<SupplyRequestItemDto> Items
    );
