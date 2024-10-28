using Ramsha.Application.Dtos.Account.Responses;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.DTOs.Account.Responses;
using Ramsha.Domain.Inventory.Entities;
using Ramsha.Domain.Suppliers.Entities;


namespace Ramsha.Application.Extensions;
public static class SupplierExtensions
{

	public static SupplierInventoryItemDto AsSupplierInventoryItemDto(this InventoryItem inventoryItem)
	{
		return new SupplierInventoryItemDto(
			inventoryItem.Id.Value,
			inventoryItem.ProductName,
			inventoryItem.InventorySKU,
			inventoryItem.AvailableQuantity,
			inventoryItem.TotalQuantity,
			new StockPriceDto(
				inventoryItem.WholesalePrice,
				inventoryItem.RetailPrice,
				inventoryItem.FinalPrice,
				inventoryItem.Currency
			),
			$"https://picsum.photos/200?random={inventoryItem.Id.Value}"

		);
	}

	public static SupplierVariantDto AsSupplierVariantDto(this SupplierVariant sVariant)
	{
		return new SupplierVariantDto(
			sVariant.ProductVariantId.Value,
			sVariant.Code,
			sVariant.WholesalePrice,
			sVariant.RetailPrice,
			sVariant.Description,
			sVariant.SupplierProductImages.Select(x => new Dtos.Products.ProductImageDto(x.Url, x.IsHome)).ToList(),
			sVariant.ProductVariant.VariantValues.Select(x => x.AsDto()).ToList()
		);
	}



	public static AuthenticatedSupplierDto AsAuthSupplierDto(this AuthenticationResult authenticationResult)
	{
		return new()
		{
			AccessToken = authenticationResult.AccessToken,
			IsVerified = authenticationResult.IsVerified,
			Email = authenticationResult.Email,
			Username = authenticationResult.Username,
			Role = authenticationResult.Role,
			RefreshTokenExpiration = authenticationResult.RefreshTokenExpiration,
		};
	}

	public static SupplyDto AsSupplyDto(this Supply supply)
	=> new SupplyDto(
		supply.Id.Value,
		supply.Total,
		supply.Status.ToString(),
		supply.Currency.ToString(),
		supply.TotalQuantity,
		supply.Sent,
		supply.ApprovedAt);


	public static SupplyRequestItemDto AsRequestItemDto(this SupplyRequestItem x)
	=> new SupplyRequestItemDto(
		x.Id.Value,
		x.ProductId.Value,
		x.ProductVariantId.Value,
		x.SupplierVariant.Code,
		x.Quantity,
		x.SupplierVariant.WholesalePrice
	);

	public static SupplyRequestDto AsSupplyRequestDto(this SupplyRequest supplyRequest)
	=> new(supplyRequest.Id.Value, supplyRequest.Items
	.Select(x => x.AsRequestItemDto()).ToList());
}
