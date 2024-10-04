
using System.Linq.Expressions;
using Ramsha.Domain.Orders;
using Ramsha.Domain.Orders.Entities;

namespace Ramsha.Application.Contracts.Persistence;

public interface IOrderRepository : IGenericRepository<Order, OrderId>
{
    Task<IEnumerable<Order>> FindOrdersWithDetails(Expression<Func<Order, bool>> criteria);
    Task<Order> FindOrderWithDetails(Expression<Func<Order, bool>> criteria);
}
