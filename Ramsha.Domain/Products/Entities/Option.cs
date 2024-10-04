

using System.Runtime.InteropServices;
using Ramsha.Domain.Common;

namespace Ramsha.Domain.Products.Entities;

public class Option : BaseEntity
{
    public OptionId Id { get; set; }
    public string Name { get; set; }
    public List<OptionValue> OptionValues { get; set; } = [];


    public static Option Create(string name)
    {
        return new Option { Id = new OptionId(Guid.NewGuid()), Name = name };
    }

    public void AddValues(List<string> values)
    {
        foreach (var value in values)
        {
            OptionValues.Add(OptionValue.Create(this, value));
        }
    }
}
