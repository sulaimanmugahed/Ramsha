
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Products;
using Ramsha.Domain.Products.Entities;
using Ramsha.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Ramsha.Persistence.Repositories;

public class CouponRepository(ApplicationDbContext context)
: GenericRepository<Coupon, CouponId>(context),
ICouponRepository
{
    private readonly DbSet<Coupon> _coupons = context.Set<Coupon>();

    public async Task<Coupon?> GetByCodeAsync(string code)
    {
        return await _coupons.SingleOrDefaultAsync(c => c.Code == code);
    }
}
