
using Ramsha.Domain.Common;

namespace Ramsha.Domain.Products.Entities;

public class ProductOption : BaseEntity
{
    public ProductOption()
    {

    }

    public ProductOption(Product product, OptionId optionId)
    {
        Product = product;
        OptionId = optionId;
    }

    public OptionId OptionId { get; set; }
    public ProductId ProductId { get; set; }

    public Option Option { get; set; }

    public Product Product { get; set; }


}
