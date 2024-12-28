using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.DependencyInjection;
using Ramsha.Application.Constants;
using Ramsha.Application.Contracts.Identity;
using Ramsha.Identity.Extensions;

namespace Ramsha.Identity.Services;

public class PermissionClaimsTransformation(IServiceScopeFactory serviceScopeFactory)
    : IClaimsTransformation
{

    public async Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
    {

        if (principal.Identity?.IsAuthenticated == true
            && !principal.HasClaim(c => c.Type == ApplicationClaims.Permission))
        {
            using var scope = serviceScopeFactory.CreateScope();

            var permissionService = scope.ServiceProvider.GetRequiredService<IPermissionService>();
            var permissions = await permissionService.GetPermissionsForUserAsync(principal.Identity.Name);


            var claims = permissions.Select(permission => new Claim(ApplicationClaims.Permission, ((int)permission.Item2).ToString()));
            var claimsIdentity = new ClaimsIdentity();
            claimsIdentity.AddClaims(claims);
            principal.AddIdentity(claimsIdentity);
        }

        return principal;
    }
}
