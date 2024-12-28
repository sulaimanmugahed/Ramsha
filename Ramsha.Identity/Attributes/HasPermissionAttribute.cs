using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Ramsha.Application.Constants;

namespace Ramsha.Identity.Attributes;

public class HasPermissionAttribute(PermissionType permissionType)
: AuthorizeAttribute(policy: ((int)permissionType).ToString())
{

}
