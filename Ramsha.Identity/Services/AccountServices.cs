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
using Microsoft.EntityFrameworkCore;
using Ramsha.Domain.Common;
using Ramsha.Application.Dtos.Account.Requests;


namespace Ramsha.Identity.Services;

public class AccountServices(ITokenService tokenService,
UserManager<Account> userManager,
IAuthenticatedUserService authenticatedUser,
SignInManager<Account> signInManager,
IEmailService emailService,
IOptionsSnapshot<JWTSettings> jwtSettings) : IAccountServices
{




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

    public async Task<BaseResult<AuthenticationResult>> Refresh(string token, string? accessToken = null)
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

        IEnumerable<Claim>? claims;
        if (accessToken is not null)
            claims = tokenService.GetPrincipalFromExpiredToken(accessToken).Claims;
        else
            claims = await GetClaimsAsync(user);

        var newAccessToken = tokenService.GenerateAccessToken(claims);

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
            Address = user.Address,
            PreferredCurrency = user.PreferredCurrency.ToString()

        };
    }


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
            return new Error(ErrorCode.ErrorInIdentity, "no user found");
        }
        var result = await signInManager.PasswordSignInAsync(user.UserName, request.Password, false, lockoutOnFailure: false);
        if (!result.Succeeded)
        {
            return new Error(ErrorCode.FieldDataInvalid, "Not found", nameof(request.Password));
        }

        var rolesList = await userManager.GetRolesAsync(user).ConfigureAwait(false);

        var claimsPrincipal = await signInManager.ClaimsFactory.CreateAsync(user);

        var jwToken = await GenerateJwtToken(user);



        AuthenticationResult response = new AuthenticationResult()
        {
            AccountId = user.Id,
            AccessToken = new JwtSecurityTokenHandler().WriteToken(jwToken),
            Email = user.Email,
            Username = user.UserName,
            Role = rolesList.FirstOrDefault(),
            IsVerified = user.EmailConfirmed,
            Address = user.Address,
            PreferredCurrency = user.PreferredCurrency.ToString()
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
            return new Error(ErrorCode.ErrorInIdentity, "no user found");
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


    public async Task LogoutCurrentUser()
    {
        await signInManager.SignOutAsync();
    }


    private async Task<IList<Claim>> GetClaimsAsync(Account user)
    {
        var result = await signInManager.ClaimsFactory.CreateAsync(user);
        return result.Claims.ToList();
    }

    public async Task UpdateAddress(string userName, Address address)
    {
        var user = await userManager.FindByNameAsync(userName);
        if (user is not null)
        {
            user.Address = address;
            await userManager.UpdateAsync(user);
        }
    }

    public async Task<bool> SendConfirmEmail(string userEmail)
    {
        var account = await userManager.FindByEmailAsync(userEmail);
        if (account is null) return false;

        var token = await GenerateConfirmationToken(account);
        await SendConfirmationEmail(userEmail, token, account.UserName);
        return true;
    }

    private async Task SendConfirmationEmail(string email, string token, string name)
    {
        var confirmationLink = $"http://localhost:3000/verifyEmail?userEmail={email}&token={token}";

        string htmlContent = $@"
<!DOCTYPE html>
<html lang=""en"">
<head>
  <meta charset=""UTF-8"">
  <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
  <title>Welcome to My Website</title>
  <style>
    body {{
      font-family: sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }}
    .container {{
      max-width: 600px;
      margin: 50px auto;
      background-color: #fff;
      border-radius: 5px;
      padding: 30px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }}
    .header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }}
    .logo {{
      width: 100px;
      height: auto;
    }}
    .content {{
      font-size: 16px;
      line-height: 1.5;
    }}
    .cta {{
      display: inline-block;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 5px;
      color: #fff;
      background-color: #8DA290;
      font-weight: bold;
      margin-top: 20px;
    }}
    a{{
        color:#8DA290;
    }}
    .footer {{
      text-align: center;
      font-size: 12px;
      color: #aaa;
      margin-top: 20px;
    }}
  </style>
</head>
<body>
  <div class=""container"">
    <div class=""header"">
      <h2>Welcome!</h2>
    </div>
    <div class=""content"">
      <p>Hi {name},</p>
      <p>Thanks for signing up in Ramsha.</p>
      <p>To confirm your email address and start using your account, please click the button below:</p>
      <a href=""{confirmationLink}"" class=""cta"">Confirm Email Address</a>
      <p>If you can't click the button, you can also paste the following link into your browser:</p>
      <p>{confirmationLink}</p>
      <p>**Please note:** This link will expire in 24 hours.</p>
    </div>
    <div class=""footer"">
      <p>&copy; {DateTime.Now.Year} Ramsha. All rights reserved.</p>
    </div>
  </div>
</body>
</html>";



        await emailService.SendEmailMessage(new Application.Contracts.Email.EmailMessage([email], "Confirm Your Email", htmlContent));
    }

    private async Task SendResetPasswordEmail(string email, string token, string name)
    {
        var confirmationLink = $"http://localhost:3000/reset-password?token={token}";

        string htmlContent = $@"
<!DOCTYPE html>
<html lang=""en"">
<head>
  <meta charset=""UTF-8"">
  <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
  <title>Welcome to My Website</title>
  <style>
    body {{
      font-family: sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }}
    .container {{
      max-width: 600px;
      margin: 50px auto;
      background-color: #fff;
      border-radius: 5px;
      padding: 30px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }}
    .header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }}
    .logo {{
      width: 100px;
      height: auto;
    }}
    .content {{
      font-size: 16px;
      line-height: 1.5;
    }}
    .cta {{
      display: inline-block;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 5px;
      color: #fff;
      background-color: #8DA290;
      font-weight: bold;
      margin-top: 20px;
    }}
    a{{
        color:#8DA290;
    }}
    .footer {{
      text-align: center;
      font-size: 12px;
      color: #aaa;
      margin-top: 20px;
    }}
  </style>
</head>
<body>
  <div class=""container"">
    <div class=""header"">
      <h2>Hi {name}</h2>
    </div>
    <div class=""content"">
     
      <p>To reset your password, please click the button below:</p>
      <a href=""{confirmationLink}"" class=""cta"">Reset Password</a>
      <p>If you can't click the button, you can also paste the following link into your browser:</p>
      <p>{confirmationLink}</p>
      <p>**Please note:** This link will expire in 1 hours.</p>
    </div>
    <div class=""footer"">
      <p>&copy; {DateTime.Now.Year} Ramsha. All rights reserved.</p>
    </div>
  </div>
</body>
</html>";



        await emailService.SendEmailMessage(new Application.Contracts.Email.EmailMessage([email], "Reset Your Password", htmlContent));
    }

    private async Task<string> GenerateConfirmationToken(Account account)
    {
        return await userManager.GenerateEmailConfirmationTokenAsync(account);
    }

    public async Task<bool> VerifyEmail(string userEmail, string token)
    {
        var user = await userManager.FindByEmailAsync(userEmail);

        if (user is null) return false;

        var result = await userManager.ConfirmEmailAsync(user, token.Replace(" ", "+"));

        return result.Succeeded;
    }

    public async Task<bool> SendResetPasswordEmail(string username)
    {
        var account = await userManager.FindByNameAsync(username);
        if (!(account is not null && await userManager.IsEmailConfirmedAsync(account)))
        {
            return false;
        }

        var token = await userManager.GeneratePasswordResetTokenAsync(account);
        await SendResetPasswordEmail(account.Email, token, username);

        return true;

    }

    public async Task<bool> ResetPassword(string username, ResetPasswordRequest request)
    {
        var account = await userManager.FindByNameAsync(username);
        if (account is null)
        {
            return false;
        }

        var result = await userManager.ResetPasswordAsync(account, request.Token.Replace(" ", "+"), request.NewPassword);
        return result.Succeeded;
    }


    public async Task<bool> ChangePassword(string username, ChangePasswordRequest request)
    {
        var account = await userManager.FindByNameAsync(username);
        if (account is null)
        {
            return false;
        }

        var result = await userManager.ChangePasswordAsync(account, request.CurrentPassword, request.NewPassword);
        if (result.Succeeded)
        {
            await signInManager.RefreshSignInAsync(account);
        }
        return result.Succeeded;
    }
}
