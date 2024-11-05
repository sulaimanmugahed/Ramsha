using Ramsha.Application.Contracts.Identity.UserInterfaces;
using Ramsha.Application.Dtos.Account.Requests;
using Ramsha.Application.Dtos.Account.Responses;
using Ramsha.Application.Wrappers;
using Ramsha.Identity.Models;
using Microsoft.AspNetCore.Identity;
using Ramsha.Domain.Common;

namespace Ramsha.Identity.Services;
public class UserService(UserManager<Account> userManager) : IUserService
{
	public async Task<BaseResult> DeleteAccount(string username)
	{
		var user = await userManager.FindByNameAsync(username);
		if (user is null)
			return new Error(ErrorCode.NotFound);

		await userManager.DeleteAsync(user);

		return BaseResult.Ok();
	}

	public async Task<Address?> GetUserAddress(string userName)
	{
		var user = await userManager.FindByNameAsync(userName);
		return user?.Address;
	}


	public async Task<BaseResult<AccountDto>> GetAccount(string username)
	{
		var account = await userManager.FindByNameAsync(username);
		if (account is null)
			return new Error(ErrorCode.NotFound);

		return new AccountDto
		{
			Username = username,
			Email = account.Email,

		};
	}

	public async Task<BaseResult<RegisterResponse>> CreateAccount(RegisterRequest request, string? role = null)
	{
		var account = new Account
		{
			Email = request.Email,
			UserName = request.Username
		};

		var result = await userManager.CreateAsync(account, request.Password);

		if (!result.Succeeded)
		{
			var errors = result.Errors.Select(e => new Error(ErrorCode.NotFound, e.Description)).ToList();
			return new List<Error>(errors);
		}

		if (role is not null)
		{
			var addToRoleResult = await userManager.AddToRoleAsync(account, role);
			if (!addToRoleResult.Succeeded)
			{
				var addToRoleError = addToRoleResult.Errors.Select(e => new Error(ErrorCode.NotFound, e.Description)).ToList();
				return new List<Error>(addToRoleError);
			}
		}


		return new RegisterResponse { Id = account.Id };
	}
}
