using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Dtos.Products;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Application.Contracts;

public interface IVariantService
{
    string GenerateSKU(string productCode, List<string> optionValuesNames);
    bool IsVariantExists(List<ProductVariant> existingVariants, List<VariantValuesCommand> variantValues);
}
