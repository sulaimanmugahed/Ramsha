using Ramsha.Application.Constants;
using Ramsha.Application.Dtos.Account.Requests;
using Ramsha.Application.Dtos.Account.Responses;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Common;
using Ramsha.Domain.Constants;


namespace Ramsha.Application.Contracts.Identity.UserInterfaces;
public interface IUserService
{
	Task<BaseResult<RegisterResponse>> CreateAccount(RegisterRequest request, string roleName = Roles.Customer, List<PermissionType>? permissions = null, bool emailConfirmed = false, bool phoneNumberConfirmed = false);
	Task<BaseResult<AccountDto>> GetAccount(string username);
	Task<BaseResult<List<AccountDto>>> GetAccounts(string? roleName = null);
	Task<BaseResult> DeleteAccount(string username);
	Task<Address?> GetUserAddress(string userName);
	Task UpdateUserAddress(string userName, Address address);


}
