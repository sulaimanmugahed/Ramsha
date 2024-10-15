using Ramsha.Application.Dtos.Baskets;
using Ramsha.Domain.Baskets.Entities;
using Ramsha.Domain.Customers.Entities;

namespace Ramsha.Application.Extensions;
public static class BasketExtensions
{


	public static BasketItemDto AsItemDto(this BasketItem basketItem)
	=> new(
				basketItem.InventoryItemId.Value,
				basketItem.Quantity,
				basketItem.InventoryItem.ProductName,
				basketItem.InventoryItem.RetailPrice,
				basketItem.InventoryItem.FinalPrice,
				basketItem.InventoryItem.InventorySKU,
				$"https://picsum.photos/200?random={basketItem.InventoryItemId}"
				);


	public static BasketDto ToDto(this Basket basket)
		=> new(
			basket.Items.Select(x => x.AsItemDto())
			.ToList(),
			basket.Buyer
			);


}
