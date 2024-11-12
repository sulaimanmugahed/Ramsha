using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ramsha.Persistence.Helpers;

public static class ValueConverter
{
    // Centralized method to convert filter values to the expected type
    public static object? ConvertToPropertyType(Type propertyType, object filterValue)
    {
        if (propertyType == typeof(decimal))
        {
            return ConvertToDecimal(filterValue);
        }
        else if (propertyType.IsEnum)
        {
            return ConvertToEnum(propertyType, filterValue);
        }
        else if (propertyType == typeof(DateTime))
        {
            return ConvertToDateTime(filterValue);
        }
        else if (propertyType == typeof(Guid))
        {
            return ConvertToGuid(filterValue);
        }
        // Add more cases for other types
        else
        {
            // Default handling: Try to convert the value based on the target type
            return Convert.ChangeType(filterValue, propertyType);
        }
    }

    private static decimal ConvertToDecimal(object filterValue)
    {
        if (filterValue is decimal decimalValue)
        {
            return decimalValue;
        }

        if (filterValue is string strValue && decimal.TryParse(strValue, out var parsedValue))
        {
            return parsedValue;
        }

        throw new ArgumentException($"Cannot convert '{filterValue}' to decimal.");
    }

    private static object? ConvertToEnum(Type enumType, object filterValue)
    {
        if (!Enum.TryParse(enumType, filterValue.ToString(), true, out var enumValue))
        {
            throw new ArgumentException($"Invalid enum value '{filterValue}' for enum type '{enumType}'");

        }
        return enumValue;
    }

    private static DateTime ConvertToDateTime(object filterValue)
    {
        if (filterValue is DateTime dateTimeValue)
        {
            return dateTimeValue;
        }

        if (filterValue is string strValue && DateTime.TryParse(strValue, out var parsedDate))
        {
            return parsedDate;
        }

        throw new ArgumentException($"Cannot convert '{filterValue}' to DateTime.");
    }

    private static Guid ConvertToGuid(object filterValue)
    {
        if (filterValue is Guid guidValue)
        {
            return guidValue;
        }

        if (filterValue is string strValue && Guid.TryParse(strValue, out var parsedGuid))
        {
            return parsedGuid;
        }

        throw new ArgumentException($"Invalid Guid value: {filterValue}");
    }
}
