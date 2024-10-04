using Ramsha.Application.Contracts.Identity;
using Ramsha.Domain.Settings;
using Ramsha.Identity.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Ramsha.Identity.Services;
public class TokenService(IOptionsSnapshot<JWTSettings> jwtSettings) : ITokenService
{

	public string GenerateAccessToken(IEnumerable<Claim> claims)
	{
		var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Value.Key));
		var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
		var tokeOptions = new JwtSecurityToken(
			issuer: jwtSettings.Value.Issuer,
			audience: jwtSettings.Value.Audience,
			claims: claims,
			expires: DateTime.UtcNow.AddMinutes(jwtSettings.Value.DurationInMinutes),
			signingCredentials: signinCredentials
		);
		var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
		return tokenString;
	}

	public (string, DateTime) GenerateRefreshToken()
	{
		var randomNumber = new byte[32];
		using var randomNumberGenerator = RandomNumberGenerator.Create();
		randomNumberGenerator.GetBytes(randomNumber);
		return (Convert.ToBase64String(randomNumber), DateTime.UtcNow.AddDays(30));
	}

	public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
	{
		var tokenValidationParameters = new TokenValidationParameters
		{
			ValidateAudience = true,
			ValidAudience = jwtSettings.Value.Audience,
			ValidateIssuer = true,
			ValidIssuer = jwtSettings.Value.Issuer,
			ValidateIssuerSigningKey = true,
			IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Value.Key)),
			ValidateLifetime = false
		};
		var tokenHandler = new JwtSecurityTokenHandler();
		SecurityToken securityToken;
		var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
		var jwtSecurityToken = securityToken as JwtSecurityToken;
		if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
			throw new SecurityTokenException("Invalid token");
		return principal;
	}
}
