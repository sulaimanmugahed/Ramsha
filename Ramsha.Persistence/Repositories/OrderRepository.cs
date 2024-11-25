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
using Ramsha.Application.DTOs.Common;
using Ramsha.Application.Dtos.Orders;
using Ramsha.Application.Wrappers;
using Ramsha.Application.Extensions;
using Ramsha.Persistence.Helpers;

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

    public async Task<PaginationResponseDto<OrderDto>> GetPaged(PagedParams pagedParams, Expression<Func<Order, bool>>? criteria = null)
    {
        var ordersQuery = _orders.AsQueryable();

        if (criteria is not null)
            ordersQuery = ordersQuery.Where(criteria);


        var sortingColumn = pagedParams.SortingParams?.ColumnsSort;
        if (sortingColumn.HasItems())
        {
            ordersQuery = ordersQuery.OrderByColumnName(sortingColumn);
        }
        else
        {
            ordersQuery = ordersQuery.OrderBy(x => x.OrderStatus);
        }

        var filterColumn = pagedParams.FilterParams?.ColumnsFilter;
        if (filterColumn.HasItems())
        {
            ordersQuery = ordersQuery.FilterByColumn(filterColumn);
        }

        return await Paged(
          ordersQuery.Select(s => s.AsDto()),
          pagedParams.PaginationParams
          );
    }
}
