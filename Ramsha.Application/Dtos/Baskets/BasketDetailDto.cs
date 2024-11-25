
using Ramsha.Domain.Suppliers;

namespace Ramsha.Application.Dtos.Baskets;

public record BasketDetailDto(
        List<BasketSupplierGroupDetailDto> SupplierGroups,
        decimal TotalDeliveryFees,
        decimal TotalPrice,
        string? ClientSecret
    );

public record BasketSupplierGroupDetailDto(Guid SupplierId, string Name, decimal TotalPrice, decimal TotalDeliveryFees, List<BasketItemDetailDto> Items);

public record BasketItemDetailDto(Guid InventoryItemId, string Name, string Sku, string? ImageUrl, decimal BasePrice, decimal DiscountedPrice, decimal TotalPrice, int Quantity, decimal DeliveryFee);

