using Ramsha.Application.DTOs.Account.Responses;
using Ramsha.Domain.Common;


namespace Ramsha.Application.Extensions;
public static class UserExtensions
{
	public static AuthenticatedUserDto AsAuthUserDto(this AuthenticationResult authenticationResponse)
	{
		return new AuthenticatedUserDto
		{
			Email = authenticationResponse.Email,
			Username = authenticationResponse.Username,
			Role = authenticationResponse.Role,
			IsVerified = authenticationResponse.IsVerified,
			AccessToken = authenticationResponse.AccessToken,
			RefreshTokenExpiration = authenticationResponse.RefreshTokenExpiration,
			Address = authenticationResponse.Address
		};
	}
}
