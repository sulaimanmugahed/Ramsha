﻿using Ramsha.Application.Dtos.Account.Requests;
using Ramsha.Application.Dtos.Account.Responses;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Common;
using Ramsha.Domain.Constants;


namespace Ramsha.Application.Contracts.Identity.UserInterfaces;
public interface IUserService
{
	Task<BaseResult<RegisterResponse>> CreateAccount(RegisterRequest request, string? role = null);
	Task<BaseResult<AccountDto>> GetAccount(string username);
	Task<BaseResult> DeleteAccount(string username);
	Task<Address?> GetUserAddress(string userName);
	Task UpdateUserAddress(string userName, Address address);
}
