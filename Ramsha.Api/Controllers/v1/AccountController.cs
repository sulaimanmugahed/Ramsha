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
using Ramsha.Application.DTOs.Account.Requests;
using System.Security.Claims;
using Ramsha.Application.Dtos.Account.Requests;


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
	public async Task<BaseResult<string>> VerifyEmail(string email, string token)
	{
		var result = await accountServices.VerifyEmail(email, token);
		if (!result)
			return new Error(ErrorCode.Exception, "some thing went wrong,we couldn't send confirm email");

		return email;
	}

	[Authorize]
	[HttpPost("change-password")]
	public async Task<BaseResult> ChangePassword(ChangePasswordRequest request)
	{
		var result = await accountServices.ChangePassword(User.Identity.Name, request);
		if (!result)
		{
			return new Error(ErrorCode.Exception, "some thing went wrong,we couldn't Change your Password");
		}
		return BaseResult.Ok();
	}

	[Authorize]
	[HttpPost("reset-password")]
	public async Task<BaseResult> ResetPassword(ResetPasswordRequest request)
	{
		var result = await accountServices.ResetPassword(User.Identity.Name, request);
		if (!result)
		{
			return new Error(ErrorCode.Exception, "some thing went wrong,we couldn't Change your Password");
		}
		return BaseResult.Ok();
	}




	[HttpPost("send-reset-password-email")]
	public async Task<BaseResult> SendResetPasswordEmail()
	{
		var result = await accountServices.SendResetPasswordEmail(authenticatedUserService.UserName);
		if (!result)
			return new Error(ErrorCode.Exception, "some thing went wrong,we couldn't send Reset Password Email");
		return BaseResult.Ok();
	}


}
