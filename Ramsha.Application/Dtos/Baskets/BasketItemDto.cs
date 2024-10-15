

namespace Ramsha.Application.Dtos.Baskets;
public record BasketItemDto(
	Guid InventoryItemId,
	int Quantity,
	string Name,
	decimal BasePrice,
	decimal FinalPrice,
	string InventorySku,
	string ImageUrl
	);




