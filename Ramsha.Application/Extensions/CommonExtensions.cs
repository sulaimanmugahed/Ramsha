
using System.Runtime.Serialization;
using System.Security.Cryptography;
using System.Text;
using Ramsha.Application.Dtos.Common;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Application.Extensions;

public static class CommonExtensions
{

    public static string ComputeHash(this string input)
    {
        using var sha256 = SHA256.Create();
        var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));
        return Convert.ToHexString(bytes);
    }

    public static string GetEnumMemberValue<TEnum>(this TEnum enumValue) where TEnum : struct, Enum
    {
        var field = enumValue.GetType().GetField(enumValue.ToString());
        var attribute = Attribute.GetCustomAttribute(field, typeof(EnumMemberAttribute)) as EnumMemberAttribute;
        return attribute?.Value ?? enumValue.ToString();
    }

    public static OptionDto AsDto(this ProductOption option)
    =>
         new(
            option.OptionId.Value,
            option.Option.Name,
            option.Option.OptionValues.Select(option =>
             new OptionValueDto(option.Id.Value, option.Name)
             ).ToList());


    public static bool HasItems<T>(this List<T>? items)
    => items is not null && items.Count > 0;

    public static OptionDto AsDto(this Option option)
    =>
    new(
      option.Id.Value,
      option.Name,
      option.OptionValues.Select(option =>
       new OptionValueDto(option.Id.Value, option.Name)
       ).ToList());


    public static string ReplaceSpaces(this string text)
    {
        return text.Replace(" ", "-");
    }

    public static string AsPascalCase(this string camelCase)
    {
        if (string.IsNullOrEmpty(camelCase) || char.IsUpper(camelCase[0]))
        {
            return camelCase;
        }

        return char.ToUpper(camelCase[0]) + camelCase.Substring(1);
    }
}



