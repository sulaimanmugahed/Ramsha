
using Ramsha.Application.Dtos.Common;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Application.Extensions;

public static class CommonExtensions
{
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


    public static string AsPascalCase(this string camelCase)
    {
        if (string.IsNullOrEmpty(camelCase) || char.IsUpper(camelCase[0]))
        {
            return camelCase;
        }

        return char.ToUpper(camelCase[0]) + camelCase.Substring(1);
    }
}



