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
using Ramsha.Application.Constants;


namespace Ramsha.Api.Controllers.v1;

/// <summary>
/// Manages account-related operations.
/// </summary>
[ApiVersion("1.0")]
public class AccountController(IStorageService storageService, IAuthenticatedUserService authenticatedUserService, IAccountServices accountServices) : BaseApiController
{

	/// <summary>
	/// Authenticates the user
	/// </summary>
	/// <remarks>
	/// This endpoint authenticates the user and provides an access token for subsequent requests.
	/// </remarks>
	[HttpPost("login")]
	public async Task<BaseResult<AuthenticatedUserDto?>> Login([FromBody] LoginCommand command)
	=> await Mediator.Send(command);

	/// <summary>
	/// Refresh the token
	/// </summary>
	/// <remarks>
	/// This endpoint issues a new access token using a valid refresh token to maintain session continuity.
	/// </remarks>

	[HttpPost("refresh")]
	public async Task<BaseResult<AuthenticatedUserDto?>> Refresh([FromBody] RefreshCommand command)
		=> await Mediator.Send(command);



	/// <summary>
	/// Revoke the token
	/// </summary>
	/// <remarks>
	/// This endpoint invalidates the refresh token, terminating the session and preventing further token generation.
	/// </remarks>
	[HttpDelete("revoke")]
	public async Task<BaseResult> Revoke(RevokeCommand command)
		=> await Mediator.Send(command);


	/// <summary>
	/// Logout the user
	/// </summary>
	/// <remarks>
	/// This endpoint ends the user session by invalidating both the access and refresh tokens.
	/// </remarks>
	[HttpPost("logout")]
	public async Task<BaseResult> LogoutUser(LogoutCommand command)
	=> await Mediator.Send(command);


	/// <summary>
	/// Update the address
	/// </summary>
	/// <remarks>
	/// This endpoint create or update the user address.
	/// </remarks>
	[HttpPut("address")]
	public async Task<BaseResult> UpdateAddress(UpdateAddressCommand command)
	=> await Mediator.Send(command);


	/// <summary>
	/// Send Confirm Email
	/// </summary>
	/// <remarks>
	/// This endpoint send confirm email link to email provided.
	/// </remarks>
	[HttpPost("send-confirm-email")]
	public async Task<BaseResult> SendConfirmEmail([FromQuery] string email)
	{
		var result = await accountServices.SendConfirmEmail(email);
		if (!result)
			return new Error(ErrorCode.Exception, "some thing went wrong,we couldn't send confirm email");

		return BaseResult.Ok();
	}

	/// <summary>
	/// Verify Email
	/// </summary>
	/// <remarks>
	/// This endpoint verify and confirm the email by providing the confirm email token
	/// </remarks>
	[HttpGet("verify-email")]
	public async Task<BaseResult<string>> VerifyEmail(string email, string token)
	{
		var result = await accountServices.VerifyEmail(email, token);
		if (!result)
			return new Error(ErrorCode.Exception, "some thing went wrong,we couldn't send confirm email");

		return email;
	}

	/// <summary>
	/// Change Password
	/// </summary>
	/// <remarks>
	/// This endpoint allows changing the password by providing the old password.
	/// </remarks>
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

	/// <summary>
	/// Change Password
	/// </summary>
	/// <remarks>
	/// This endpoint allows changing the password by providing the reset password token.
	/// </remarks>
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

	/// <summary>
	/// Send Reset Password Email
	/// </summary>
	/// <remarks>
	/// This endpoint sends a password reset link to the email provided.
	/// </remarks>
	[HttpPost("send-reset-password-email")]
	public async Task<BaseResult> SendResetPasswordEmail()
	{
		var result = await accountServices.SendResetPasswordEmail(authenticatedUserService.UserName);
		if (!result)
			return new Error(ErrorCode.Exception, "some thing went wrong,we couldn't send Reset Password Email");
		return BaseResult.Ok();
	}


}
