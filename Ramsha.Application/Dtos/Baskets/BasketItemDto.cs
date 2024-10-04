

namespace Ramsha.Application.Dtos.Baskets;
public record BasketItemDto(

	int Quantity,
	Guid ProductId,
	string Name,
	decimal RetailPrice,
	decimal DiscountedPrice,
	string InventorySku,
	string ImageUrl
	);




