using Ramsha.Application.Contracts;

using System.Security.Claims;

namespace Ramsha.Api.Infrastructure.Services;

public class AuthenticatedUserService : IAuthenticatedUserService
{
    public AuthenticatedUserService(IHttpContextAccessor httpContextAccessor)
    {
        UserId = httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
		UserName = httpContextAccessor.HttpContext?.User?.Identity.Name;
    }

    public string UserId { get; }
    public string UserName { get; }
	public string Role { get; }
}
