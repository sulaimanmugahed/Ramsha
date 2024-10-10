using Ramsha.Application.Dtos.Account.Responses;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.DTOs.Account.Responses;
using Ramsha.Domain.Suppliers.Entities;


namespace Ramsha.Application.Extensions;
public static class SupplierExtensions
{
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

	public static SupplyDto AsSupplyDto(this Supply supplyRequest)
	=> new(supplyRequest.Id.Value, supplyRequest.Items
	.Select(x => new SupplyItemDto(
		x.Id.Value,
		x.ItemSupplied.ProductId.Value,
		x.ItemSupplied.Name,
		x.ItemSupplied.Sku,
		x.Quantity,
		x.WholesalePrice
	)).ToList(),
	supplyRequest.Status.ToString());

	public static SupplyRequestDto AsSupplyRequestDto(this SupplyRequest supplyRequest)
	=> new(supplyRequest.Id.Value, supplyRequest.Items
	.Select(x => new SupplyRequestItemDto(
		x.Id.Value,
		x.ProductId.Value,
		x.SKU,
		x.Quantity,
		x.WholesalePrice
	)).ToList());
}
