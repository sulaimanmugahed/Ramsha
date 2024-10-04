using Ramsha.Application.Dtos.Baskets;
using Ramsha.Domain.Customers.Entities;

namespace Ramsha.Application.Extensions;
public static class BasketExtensions
{
	public static BasketDto ToDto(this Basket basket)
		=> new(
			basket.Items.Select(x => new BasketItemDto(
				x.Quantity,
				x.InventoryItemId.Value,
				x.InventoryItem.ProductName,
				x.InventoryItem.RetailPrice,
				x.InventoryItem.FinalPrice,
				x.InventoryItem.InventorySKU,
				x.InventoryItem.ImageUrl
				))
			.ToList(),
			basket.Buyer
			);


}
