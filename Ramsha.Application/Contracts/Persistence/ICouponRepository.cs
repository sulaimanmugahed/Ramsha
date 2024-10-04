

using Ramsha.Domain.Products;
using Ramsha.Domain.Products.Entities;

namespace Ramsha.Application.Contracts.Persistence;

public interface ICouponRepository : IGenericRepository<Coupon, CouponId>
{
    Task<Coupon?> GetByCodeAsync(string code);
}
