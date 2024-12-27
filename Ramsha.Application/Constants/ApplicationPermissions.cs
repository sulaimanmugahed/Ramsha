using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ramsha.Application.Constants;

public static class ApplicationPermissions
{
    public static class Roles
    {
        public const string View = "roles:view";
        public const string Create = "roles:create";
        public const string Update = "roles:update";
        public const string Delete = "roles:delete";
    }

    public static class Users
    {
        public const string View = "users:view";
        public const string Create = "users:create";
        public const string Update = "users:update";
        public const string Delete = "users:delete";
    }

    //   public static class Roles
    // {
    //     public const string View = "Permissions.Roles.View";
    //     public const string Create = "Permissions.Roles.Create";
    //     public const string Update = "Permissions.Roles.Update";
    //     public const string Delete = "Permissions.Roles.Delete";
    // }

    // public static class Users
    // {
    //     public const string View = "Permissions.Users.View";
    //     public const string Create = "Permissions.Users.Create";
    //     public const string Update = "Permissions.Users.Update";
    //     public const string Delete = "Permissions.Users.Delete";
    // }

    public static List<string> All()
    {
        var permissions = new List<string>();

        var nestedClasses = typeof(ApplicationPermissions).GetNestedTypes();

        foreach (var nestedClass in nestedClasses)
        {
            var fields = nestedClass.GetFields(System.Reflection.BindingFlags.Public |
                                               System.Reflection.BindingFlags.Static |
                                               System.Reflection.BindingFlags.FlattenHierarchy);

            foreach (var field in fields)
            {
                if (field.IsLiteral && !field.IsInitOnly)
                {
                    var value = field.GetValue(null)?.ToString();
                    if (value != null)
                    {
                        permissions.Add(value);
                    }
                }
            }
        }

        return permissions;
    }


}
