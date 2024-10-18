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

	public static SupplyDto AsSupplyDto(this Supply supply)
	=> new SupplyDto(
		supply.Id.Value,
		supply.Total,
		supply.Status.ToString(),
		supply.Currency.ToString(),
		supply.TotalQuantity,
		supply.Sent,
		supply.ApprovedAt);

	public static SupplyRequestDto AsSupplyRequestDto(this SupplyRequest supplyRequest)
	=> new(supplyRequest.Id.Value, supplyRequest.Items
	.Select(x => new SupplyRequestItemDto(
		x.Id.Value,
		x.ProductId.Value,
		x.ProductVariantId.Value,
		x.SKU,
		x.Quantity,
		x.WholesalePrice
	)).ToList());
}
