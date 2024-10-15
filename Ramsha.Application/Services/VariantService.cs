using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Products;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Application.Services;

public class VariantService : IVariantService
{
    public string GenerateSKU(string productName, List<string> optionValuesNames)
    {
        var sku = new StringBuilder(productName.Substring(0, Math.Min(5, productName.Length)).ToUpper().ReplaceSpaces());

        foreach (var valueName in optionValuesNames)
        {
            char letter = valueName.First();
            sku.Append($"-{letter}");
        }

        return sku.ToString().ToUpper();
    }


    public bool IsVariantExists(List<ProductVariant> existingVariants, List<VariantValuesCommand> variantValues)
    {

        foreach (var variant in existingVariants)
        {
            if (variant.VariantValues.Count != variantValues.Count)
                continue;

            bool allValuesMatch = variant.VariantValues.All(vv =>
                variantValues.Any(nvv => nvv.Option == vv.OptionId.Value && nvv.Value == vv.OptionValueId.Value)
            );

            if (allValuesMatch)
                return true;
        }

        return false;
    }


}

