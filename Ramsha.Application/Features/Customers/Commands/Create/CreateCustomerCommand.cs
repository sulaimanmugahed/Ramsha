using Ramsha.Application.Wrappers;
using MediatR;
using Ramsha.Domain.Products.Enums;


namespace Ramsha.Application.Features.Customers.Commands.Create;
public class CreateCustomerCommand : IRequest<BaseResult<string>>
{
	public string FirstName { get; set; }
	public string LastName { get; set; }
	public string Email { get; set; }
	public string Username { get; set; }
	public string Password { get; set; }
	public Currency PreferredCurrency { get; set; }



}
