

using Ramsha.Domain.Products;
using Ramsha.Domain.Suppliers;

namespace Ramsha.Application.Contracts;

public interface IPriceService
{
    Task<decimal> CalculateFinalPrice(ProductId productId, SupplierId supplierId, decimal purchaseAmount, string couponCode);

}
