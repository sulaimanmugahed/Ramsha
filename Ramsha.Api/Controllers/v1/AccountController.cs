using Asp.Versioning;
using Ramsha.Application.Contracts;
using Ramsha.Application.Dtos.Account.Responses;
using Ramsha.Application.DTOs.Account.Responses;
using Ramsha.Application.Features.Account.Commands.Login;
using Ramsha.Application.Features.Account.Commands.Logout;
using Ramsha.Application.Features.Account.Commands.RefreshToken;
using Ramsha.Application.Features.Account.Commands.RevokeToken;

using Ramsha.Application.Wrappers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Ramsha.Application.Features.Account.Commands.UpdateAddress;
using Ramsha.Application.Contracts.Identity;


namespace Ramsha.Api.Controllers.v1;

[ApiVersion("1.0")]
public class AccountController(IStorageService storageService, IAuthenticatedUserService authenticatedUserService, IAccountServices accountServices) : BaseApiController
{
	[Authorize]
	[HttpGet(nameof(Test))]
	public string Test()
	=> authenticatedUserService.UserId;



	[HttpPost(nameof(Login))]
	public async Task<BaseResult<AuthenticatedUserDto?>> Login([FromBody] LoginCommand command)
	=> await Mediator.Send(command);

	[HttpPost(nameof(Refresh))]
	public async Task<BaseResult<AuthenticatedUserDto?>> Refresh([FromBody] RefreshCommand command)
		=> await Mediator.Send(command);

	[HttpDelete(nameof(Revoke))]
	public async Task<BaseResult> Revoke(RevokeCommand command)
		=> await Mediator.Send(command);

	[HttpPost("logout")]
	public async Task<BaseResult> LogoutUser(LogoutCommand command)
	=> await Mediator.Send(command);

	[HttpPut("address")]
	public async Task<BaseResult> UpdateAddress(UpdateAddressCommand command)
	=> await Mediator.Send(command);


	[HttpPost("send-confirm-email")]
	public async Task<BaseResult> SendConfirmEmail([FromQuery] string email)
	{
		var result = await accountServices.SendConfirmEmail(email);
		if (!result)
			return new Error(ErrorCode.Exception, "some thing went wrong,we couldn't send confirm email");

		return BaseResult.Ok();
	}

	[HttpGet("verify-email")]
	public async Task<BaseResult> VerifyEmail(string email, string token)
	{
		var result = await accountServices.VerifyEmail(email, token);
		if (!result)
			return new Error(ErrorCode.Exception, "some thing went wrong,we couldn't send confirm email");

		return BaseResult.Ok();
	}


}
