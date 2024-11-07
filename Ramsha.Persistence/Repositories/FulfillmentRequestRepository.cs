
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Orders;
using Ramsha.Application.DTOs.Common;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Orders;
using Ramsha.Domain.Orders.Entities;
using Ramsha.Domain.Suppliers;
using Ramsha.Domain.Suppliers.Entities;
using Ramsha.Persistence.Contexts;
using Ramsha.Persistence.Helpers;

namespace Ramsha.Persistence.Repositories;

public class FulfillmentRequestRepository(ApplicationDbContext context)
 : GenericRepository<FulfillmentRequest, FulfillmentRequestId>(context), IFulfillmentRequestRepository
{
    private readonly DbSet<FulfillmentRequest> _requests = context.Set<FulfillmentRequest>();

    public async Task<PaginationResponseDto<FulfillmentRequestDto>> GetPaged(PaginationParams paginationParams, FilterParams? filterParams, SortingParams? sortingParams, Expression<Func<FulfillmentRequest, bool>>? criteria = null)
    {
        var query = _requests.AsQueryable();

        if (criteria is not null)
        {
            query = query.Where(criteria);
        }

        if (sortingParams is not null)
        {
            query = query.OrderByColumnName(sortingParams.ColumnsSort);
        }
        else
        {
            query = query.OrderBy(x => x.Created);
        }

        if (filterParams is not null)
        {
            var globalFilter = filterParams.GlobalFilterValue;

            if (filterParams.ColumnsFilter.HasItems())
            {
                query = query.FilterByColumn(filterParams.ColumnsFilter);
            }
        }

        return await Paged(
          query.Select(p => p.AsFulfillmentRequestDto()),
          paginationParams
          );
    }
}
