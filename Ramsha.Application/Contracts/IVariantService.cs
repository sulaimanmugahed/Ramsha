
using Ramsha.Application.Dtos.Products;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Application.Contracts;

public interface IVariantService
{
    bool IsVariantExists(List<ProductVariant> existingVariants, List<VariantValuesCommand> variantValues);
}
