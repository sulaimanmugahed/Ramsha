using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Constants;

namespace Ramsha.Application.Dtos.Permissions;

public record PermissionDto(Guid Id,PermissionType PermissionType);
