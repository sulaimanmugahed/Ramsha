using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Ramsha.Application.Contracts.Identity;
public interface ITokenService
{
	string GenerateAccessToken(IEnumerable<Claim> claims);
	(string, DateTime) GenerateRefreshToken();
	ClaimsPrincipal GetPrincipalFromExpiredToken(string token);


}
