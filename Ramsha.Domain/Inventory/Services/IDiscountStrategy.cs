

namespace Ramsha.Domain.Inventory.Services;

public interface IDiscountStrategy
{
    decimal ApplyDiscount(decimal originalPrice);
}
