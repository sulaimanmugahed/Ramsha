using Ramsha.Application.DTOs.Account.Responses;
using Ramsha.Application.Wrappers;
using MediatR;


namespace Ramsha.Application.Features.Account.Commands.Login;
public class LoginCommand:IRequest<BaseResult<AuthenticatedUserDto?>>
{
	public string Username { get; set; }
	public string Password { get; set; }
}
