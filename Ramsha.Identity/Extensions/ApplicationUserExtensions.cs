using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Ramsha.Application.Constants;

namespace Ramsha.Identity.Extensions;

public static class ApplicationUserExtensions
{
    public static HashSet<string> GetPermissions(this ClaimsPrincipal claimsPrincipal)
    {
        return claimsPrincipal
            .FindAll(ApplicationClaims.Permission)
            .Select(c => c.Value)
            .ToHashSet();
    }

    public static Guid GetUserId(this ClaimsPrincipal claimsPrincipal)
    {

        var id = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? throw new InvalidOperationException("User id claim not found.");

        return Guid.Parse(id);
    }
}