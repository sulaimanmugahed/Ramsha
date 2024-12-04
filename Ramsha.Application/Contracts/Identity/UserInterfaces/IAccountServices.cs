
using Ramsha.Application.DTOs.Account.Requests;
using Ramsha.Application.DTOs.Account.Responses;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Common;

namespace Ramsha.Application.Contracts.Identity
{
    public interface IAccountServices
    {
        Task<BaseResult> ChangePassword(ChangePasswordRequest model);
        Task<BaseResult> ChangeUserName(ChangeUserNameRequest model);
        Task<BaseResult<AuthenticationResult>> Authenticate(AuthenticationRequest request);
        Task<BaseResult<AuthenticationResult>> AuthenticateByUserName(string username);
        Task<BaseResult<AuthenticationResult>> GetCurrentAccount();
        Task<BaseResult<AuthenticationResult>> Refresh(string token, string? accessToken = null);
        Task<BaseResult> Revoke(string token);
        Task LogoutCurrentUser();
        Task UpdateAddress(string userName, Address address);
        Task<bool> SendConfirmEmail(string userEmail);
        Task<bool> VerifyEmail(string userEmail, string token);

    }
}
