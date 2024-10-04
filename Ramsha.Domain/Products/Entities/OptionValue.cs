

namespace Ramsha.Domain.Products.Entities;

public class OptionValue
{
    public OptionValueId Id { get; set; }
    public OptionId OptionId { get; set; }
    public Option Option { get; set; }
    public string Name { get; set; }


    public static OptionValue Create(Option option, string value)
    {
        return new OptionValue
        {
            Id = new OptionValueId(Guid.NewGuid()),
            Option = option,
            Name = value
        };
    }
}