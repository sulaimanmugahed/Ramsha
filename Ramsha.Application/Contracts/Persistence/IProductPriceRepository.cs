
using Ramsha.Domain.Products;
using Ramsha.Domain.Products.Entities;
using Ramsha.Domain.Suppliers;

namespace Ramsha.Application.Contracts.Persistence;

public interface IProductPriceRepository : IGenericRepository<ProductPrice, int>
{
    Task<ProductPrice?> GetProductPriceAsync(ProductId productId, SupplierId supplierId);
}
