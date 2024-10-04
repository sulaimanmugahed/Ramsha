
using Ramsha.Domain.Products.Enums;

namespace Ramsha.Domain.Products.Entities;

public class Discount
{
    private Discount(decimal value, DateTime startDate, DateTime endDate, DiscountType type)
    {
        Type = type;
        Value = value;
        StartDate = startDate;
        EndDate = endDate;
    }

    public static Discount Create(decimal value, DateTime startDate, DateTime endDate, DiscountType type = DiscountType.Percentage)
    {
        return new Discount(value, startDate, endDate, type);
    }

    public bool IsValid => StartDate <= DateTime.UtcNow && EndDate >= DateTime.UtcNow;
    public DiscountType Type { get; set; }
    public decimal Value { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

}
