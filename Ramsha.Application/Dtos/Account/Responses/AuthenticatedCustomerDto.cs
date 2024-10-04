using Ramsha.Application.Dtos.Baskets;
using Ramsha.Application.DTOs.Account.Responses;


namespace Ramsha.Application.Dtos.Account.Responses;
public class AuthenticatedCustomerDto: AuthenticatedUserDto
{
	public BasketDto? Basket { get; set; }
}
