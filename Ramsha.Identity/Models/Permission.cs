using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ramsha.Identity.Models;

public class Permission
{
    public Guid Id { get; }

    public string Name { get; }

    private Permission(Guid id, string name)
    {
        Id = id;
        Name = name;
    }

    private Permission()
    { }

    public static Permission Create(string name)
    {
        return new Permission(Guid.NewGuid(), name);
    }
}
