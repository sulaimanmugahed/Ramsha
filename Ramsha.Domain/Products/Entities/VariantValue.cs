namespace Ramsha.Domain.Products.Entities;

public class VariantValue
{
    public VariantValue()
    {

    }
    public VariantValue(ProductVariant productVariant,OptionId optionId, OptionValueId optionValueId)
    {
        ProductId = productVariant.ProductId;
        OptionId = optionId;
        OptionValueId = optionValueId;
        ProductVariant = productVariant;
    }

    public ProductId ProductId { get; set; }


    public OptionId OptionId { get; set; }
    public OptionValueId OptionValueId { get; set; }

    public ProductVariant ProductVariant { get; set; }
    public ProductVariantId ProductVariantId { get; set; }
    public Option Option { get; set; }
    public OptionValue OptionValue { get; set; }

}
