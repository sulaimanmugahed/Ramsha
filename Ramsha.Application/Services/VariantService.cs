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

