using Ramsha.Application.Contracts;

using System.Security.Claims;

namespace Ramsha.Api.Infrastructure.Services;

public class AuthenticatedUserService(IHttpContextAccessor httpContextAccessor) : IAuthenticatedUserService
{
    public string UserId { get; } = httpContextAccessor.HttpContext?.User?.FindFirst("CurrentUserId")?.Value ?? "no id";
    public string UserName { get; } = httpContextAccessor.HttpContext?.User?.Identity.Name;
    public string Role { get; }

}
