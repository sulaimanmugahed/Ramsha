using Ramsha.Application.Dtos.Account.Responses;
using Ramsha.Application.Dtos.Baskets;
using Ramsha.Application.DTOs.Account.Responses;
using Ramsha.Domain.Customers.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ramsha.Application.Extensions;
public static class CustomerExtensions
{
	public static AuthenticatedCustomerDto AsAuthCustomerDto(this AuthenticationResult authenticationResult,Basket? basket)
	{
		return new AuthenticatedCustomerDto
		{
			AccessToken = authenticationResult.AccessToken,
			IsVerified = authenticationResult.IsVerified,
			Email = authenticationResult.Email,
			Username = authenticationResult.Username,
			Role = authenticationResult.Role,
			RefreshTokenExpiration = authenticationResult.RefreshTokenExpiration,
			Basket = basket?.ToDto(),
		};

	}
}
