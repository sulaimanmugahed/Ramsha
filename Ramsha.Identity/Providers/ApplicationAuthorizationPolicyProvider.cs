using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using Ramsha.Application.Constants;
using Ramsha.Identity.Common;
using Ramsha.Identity.Extensions;

namespace Ramsha.Identity.Providers;

public class ApplicationAuthorizationPolicyProvider(IOptions<AuthorizationOptions> options)
    : DefaultAuthorizationPolicyProvider(options)
{
    public override async Task<AuthorizationPolicy?> GetPolicyAsync(string policyName)
    {
        var policy = await base.GetPolicyAsync(policyName);

        if (policy is null)
        {
            if (ApplicationPermissions.All().Contains(policyName))
            {
                policy = new AuthorizationPolicyBuilder(JwtBearerDefaults.AuthenticationScheme)
                    .AddRequirements(new PermissionAuthorizationRequirement(policyName))
                    .RequireAuthenticatedUser()
                    .Build();
            }
        }

        return policy;
    }
}

