using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Orders;
using Ramsha.Domain.Orders.Entities;
using Ramsha.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Ramsha.Persistence.Repositories;

public class OrderRepository(ApplicationDbContext context)
 : GenericRepository<Order, OrderId>(context),
 IOrderRepository
{
    private readonly DbSet<Order> _orders = context.Set<Order>();

    public async Task<IEnumerable<Order>> FindOrdersWithDetails(Expression<Func<Order, bool>> criteria)
    {
        return await _orders
        .Include(x => x.OrderItems)
        .ThenInclude(x => x.ItemOrdered)
        .Where(criteria).ToListAsync();
    }

    public async Task<Order?> FindOrderWithDetails(Expression<Func<Order, bool>> criteria)
    {
        return await _orders
        .Include(x => x.OrderItems)
        .ThenInclude(x => x.ItemOrdered)
        .FirstOrDefaultAsync(criteria);
    }

}
