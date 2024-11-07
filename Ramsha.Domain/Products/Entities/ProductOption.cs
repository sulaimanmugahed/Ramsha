
using Ramsha.Domain.Common;

namespace Ramsha.Domain.Products.Entities;

public class ProductOption : BaseEntity
{
    public ProductOption()
    {

    }

    public ProductOption(Product product, Option option, int priority)
    {
        Product = product;
        Option = option;
        OptionId = option.Id;
        Priority = priority;
    }



    public int Priority { get; set; }
    public OptionId OptionId { get; set; }
    public ProductId ProductId { get; set; }

    public Option Option { get; set; }

    public Product Product { get; set; }


}
