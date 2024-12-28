using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Constants;
using Ramsha.Application.Extensions;

namespace Ramsha.Identity.Models;

public class Permission
{
    public Guid Id { get; }

    public PermissionType Type { get; }

    private Permission(Guid id, PermissionType type)
    {
        Id = id;
        Type = type;
    }

    private Permission()
    { }

    public static Permission Create(PermissionType type)
    {
        return new Permission(Guid.NewGuid(), type);
    }
}
