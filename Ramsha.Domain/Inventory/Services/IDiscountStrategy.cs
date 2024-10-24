

using Ramsha.Domain.Common;

namespace Ramsha.Domain.Inventory.Services;

public interface IDiscountStrategy
{
    Price ApplyDiscount(Price originalPrice);
}
