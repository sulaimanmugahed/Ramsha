using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Identity;
using Ramsha.Application.DTOs.Account.Requests;
using Ramsha.Application.DTOs.Account.Responses;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Settings;
using Ramsha.Identity.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Ramsha.Domain.Constants;
using Ramsha.Application.Dtos.Account.Requests;
using Ramsha.Application.Dtos.Account.Responses;
using Microsoft.EntityFrameworkCore;


namespace Ramsha.Identity.Services;

public class AccountServices(ITokenService tokenService,
UserManager<Account> userManager,
IAuthenticatedUserService authenticatedUser,
SignInManager<Account> signInManager,
IOptionsSnapshot<JWTSettings> jwtSettings) : IAccountServices
{

    public async Task<BaseResult> ChangePassword(ChangePasswordRequest model)
    {
        var user = await userManager.FindByIdAsync(authenticatedUser.UserId);

        var token = await userManager.GeneratePasswordResetTokenAsync(user);

        var identityResult = await userManager.ResetPasswordAsync(user, token, model.Password);

        if (identityResult.Succeeded)
            return new BaseResult();

        return new List<Error>(identityResult.Errors.Select(p => new Error(ErrorCode.ErrorInIdentity, p.Description)));
    }


    public async Task<BaseResult> Revoke(string token)
    {

        var user = await userManager.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == token));

        if (user is null)
            return new Error(ErrorCode.ErrorInIdentity, "user null");

        var refreshToken = user.RefreshTokens.Single(t => t.Token == token);
        if (!refreshToken.IsActive)
            return new Error(ErrorCode.ErrorInIdentity, "refreshToken expired");


        refreshToken.RevokedOn = DateTime.UtcNow;

        await userManager.UpdateAsync(user);
        return BaseResult.Ok();
    }

    // public async Task<BaseResult<AuthenticationResult>> Refresh(string refreshToken, string? accessToken)
    // {
    //     var user = await userManager.Users.FirstOrDefaultAsync(u => u.RefreshToken.Token == refreshToken);

    //     if (user is null || user.RefreshToken.IsExpired)
    //         return new Error(ErrorCode.ErrorInIdentity);


    //     IEnumerable<Claim>? claims;
    //     if (accessToken is not null)
    //         claims = tokenService.GetPrincipalFromExpiredToken(accessToken).Claims;
    //     else
    //         claims = await GetClaimsAsync(user);


    //     var newAccessToken = tokenService.GenerateAccessToken(claims);

    //     var newRefreshToken = tokenService.GenerateRefreshToken();

    //     user.RefreshToken.Token = newRefreshToken;
    //     user.RefreshToken.ExpiryTime = DateTime.UtcNow.AddMinutes(60);

    //     await userManager.UpdateAsync(user);

    //     var rolesList = await userManager.GetRolesAsync(user).ConfigureAwait(false);


    //     return new AuthenticationResult
    //     {
    //         AccessToken = newAccessToken,
    //         RefreshToken = newRefreshToken,
    //         RefreshTokenExpiration = user.RefreshToken.ExpiryTime,
    //         Username = user.UserName,
    //         Email = user.Email,
    //         AccountId = user.Id,
    //         Role = rolesList.FirstOrDefault(),
    //         IsVerified = user.EmailConfirmed,
    //     };
    // }


    public async Task<BaseResult> ChangeUserName(ChangeUserNameRequest model)
    {
        var user = await userManager.FindByIdAsync(authenticatedUser.UserId);

        user.UserName = model.UserName;

        var identityResult = await userManager.UpdateAsync(user);

        if (identityResult.Succeeded)
            return new BaseResult();

        return new List<Error>(identityResult.Errors.Select(p => new Error(ErrorCode.ErrorInIdentity, p.Description)));
    }

    public async Task<BaseResult<AuthenticationResult>> Authenticate(AuthenticationRequest request)
    {
        var user = await userManager.FindByNameAsync(request.UserName);
        if (user == null)
        {
            return new Error(ErrorCode.NotFound, "Not found", nameof(request.UserName));
        }
        var result = await signInManager.PasswordSignInAsync(user.UserName, request.Password, false, lockoutOnFailure: false);
        if (!result.Succeeded)
        {
            return new Error(ErrorCode.FieldDataInvalid, "Not found", nameof(request.Password));
        }

        var rolesList = await userManager.GetRolesAsync(user).ConfigureAwait(false);

        var claimsPrincipal = await signInManager.ClaimsFactory.CreateAsync(user);

        AuthenticationResult response = new AuthenticationResult()
        {
            AccountId = user.Id,
            AccessToken = tokenService.GenerateAccessToken(claimsPrincipal.Claims),
            Email = user.Email,
            Username = user.UserName,
            Role = rolesList.FirstOrDefault(),
            IsVerified = user.EmailConfirmed,
        };

        if (user.RefreshTokens.Any(t => t.IsActive))
        {
            var activeRefreshToken = user.RefreshTokens.FirstOrDefault(t => t.IsActive);
            response.RefreshToken = activeRefreshToken.Token;
            response.RefreshTokenExpiration = activeRefreshToken.ExpiresOn;

        }
        else
        {
            var (refreshToken, expired) = tokenService.GenerateRefreshToken();
            response.RefreshToken = refreshToken;
            response.RefreshTokenExpiration = expired;

            user.RefreshTokens.Add(new RefreshToken
            {
                Token = refreshToken,
                ExpiresOn = expired,
                CreatedOn = DateTime.UtcNow
            });
            await userManager.UpdateAsync(user);

        }

        return response;
    }


    public async Task<BaseResult<AuthenticationResult>> GetCurrentAccount()
    {
        var user = await userManager.FindByNameAsync(authenticatedUser.UserName);
        if (user == null)
        {
            return new Error(ErrorCode.NotFound, "Not Found");
        }

        var rolesList = await userManager.GetRolesAsync(user).ConfigureAwait(false);

        var claimsPrincipal = await signInManager.ClaimsFactory.CreateAsync(user);

        var jwToken = tokenService.GenerateAccessToken(claimsPrincipal.Claims);

        AuthenticationResult response = new()
        {
            AccountId = user.Id,
            AccessToken = jwToken,
            Email = user.Email,
            Username = user.UserName,
            Role = rolesList.FirstOrDefault(),
            IsVerified = user.EmailConfirmed,
        };

        return response;
    }

    public async Task<BaseResult<AuthenticationResult>> AuthenticateByUserName(string username)
    {
        var user = await userManager.FindByNameAsync(username);
        if (user == null)
        {
            return new Error(ErrorCode.NotFound, "Not Found", nameof(username));
        }

        var rolesList = await userManager.GetRolesAsync(user).ConfigureAwait(false);

        var claimsPrincipal = await signInManager.ClaimsFactory.CreateAsync(user);

        var jwToken = tokenService.GenerateAccessToken(claimsPrincipal.Claims);

        AuthenticationResult response = new AuthenticationResult()
        {
            AccountId = user.Id,
            AccessToken = jwToken,
            Email = user.Email,
            Username = user.UserName,
            Role = rolesList.FirstOrDefault(),
            IsVerified = user.EmailConfirmed,
        };

        return response;
    }

    //public async Task<BaseResult<string>> RegisterGostAccount()
    //{
    //    var user = new Account()
    //    {
    //        UserName = GenerateRandomString(7)
    //    };

    //    var identityResult = await userManager.CreateAsync(user);

    //    if (identityResult.Succeeded)
    //        return new BaseResult<string>(user.UserName);

    //    return new BaseResult<string>(identityResult.Errors.Select(p => new Error(ErrorCode.ErrorInIdentity, p.Description)));

    //    string GenerateRandomString(int length)
    //    {
    //        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    //        var random = new Random();
    //        var result = new StringBuilder(length);

    //        for (int i = 0; i < length; i++)
    //        {
    //            int index = random.Next(chars.Length);
    //            result.Append(chars[index]);
    //        }

    //        return result.ToString();
    //    }
    //}
    private async Task<JwtSecurityToken> GenerateJwtToken(Account user)
    {
        await userManager.UpdateSecurityStampAsync(user);

        var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Value.Key));
        var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

        var jwtSecurityToken = new JwtSecurityToken(
            issuer: jwtSettings.Value.Issuer,
            audience: jwtSettings.Value.Audience,
            claims: await GetClaimsAsync(user),
            expires: DateTime.UtcNow.AddMinutes(jwtSettings.Value.DurationInMinutes),
            signingCredentials: signingCredentials);
        return jwtSecurityToken;


    }

    public async Task<BaseResult<AuthenticationResult>> Refresh(string token)
    {
        var user = await userManager.Users.FirstOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == token));

        if (user is null)
            return new Error(ErrorCode.ErrorInIdentity, "no user found");

        var refreshToken = user.RefreshTokens.Single(t => t.Token == token);
        if (!refreshToken.IsActive)
            return new Error(ErrorCode.ErrorInIdentity, "the token expired");

        refreshToken.RevokedOn = DateTime.UtcNow;
        var (newRefreshToken, expired) = tokenService.GenerateRefreshToken();
        user.RefreshTokens.Add(new RefreshToken
        {
            Token = newRefreshToken,
            ExpiresOn = expired,
            CreatedOn = DateTime.UtcNow
        });

        await userManager.UpdateAsync(user);

        var claimsPrincipal = await signInManager.ClaimsFactory.CreateAsync(user);


        var jwtToken = await GenerateJwtToken(user);

        var newAccessToken = tokenService.GenerateAccessToken(claimsPrincipal.Claims);

        var rolesList = await userManager.GetRolesAsync(user).ConfigureAwait(false);

        return new AuthenticationResult
        {
            AccessToken = newAccessToken,
            RefreshToken = newRefreshToken,
            RefreshTokenExpiration = expired,
            Username = user.UserName,
            Email = user.Email,
            AccountId = user.Id,
            Role = rolesList.FirstOrDefault(),
            IsVerified = user.EmailConfirmed,
        };
    }

    public async Task LogoutCurrentUser()
    {
        await signInManager.SignOutAsync();
    }


    private async Task<IList<Claim>> GetClaimsAsync(Account user)
    {
        var result = await signInManager.ClaimsFactory.CreateAsync(user);
        return result.Claims.ToList();
    }




}
