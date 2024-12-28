using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Ramsha.Application.Constants;

public enum PermissionType
{
    RolesView = 1,

    RolesCreate,

    RolesUpdate,

    RolesDelete,

    UsersView,

    UsersCreate,

    UsersUpdate,

    UsersDelete
}
