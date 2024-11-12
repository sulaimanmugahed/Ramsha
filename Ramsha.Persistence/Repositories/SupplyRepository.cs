
using System.Linq.Expressions;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Domain.Suppliers;
using Ramsha.Domain.Suppliers.Entities;
using Ramsha.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using Ramsha.Application.DTOs.Common;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Wrappers;
using Ramsha.Application.Extensions;
using Ramsha.Persistence.Helpers;
using Ramsha.Application.Dtos.Supplies;

namespace Ramsha.Persistence.Repositories;

public class SupplyRepository(ApplicationDbContext context) : GenericRepository<Supply, SupplyId>(context), ISupplyRepository
{
    private DbSet<Supply> _supplies = context.Set<Supply>();

    public async Task<Supply?> GetWithDetails(Expression<Func<Supply, bool>> criteria)
    {
        return await _supplies
        .Include(r => r.Items)
        .ThenInclude(r => r.ItemSupplied)
        .SingleOrDefaultAsync(criteria);
    }

    public async Task<IEnumerable<Supply>> FindAllWithDetail(Expression<Func<Supply, bool>> criteria)
    {
        return await _supplies.Where(criteria).Include(r => r.Items).ToListAsync();
    }

    public async Task<PaginationResponseDto<SupplyDto>> GetSuppliesPaged(PagedParams pagedParams, Expression<Func<Supply, bool>>? criteria = null)
    {
        var suppliesQuery = _supplies.OrderBy(x => x.Status).AsQueryable();

        if (criteria is not null)
            suppliesQuery = suppliesQuery.Where(criteria);


        var sortingColumn = pagedParams.SortingParams?.ColumnsSort;
        if (sortingColumn.HasItems())
        {
            suppliesQuery = suppliesQuery.OrderByColumnName(sortingColumn);
        }

        var filterColumn = pagedParams.FilterParams?.ColumnsFilter;
        if (filterColumn.HasItems())
        {
            suppliesQuery = suppliesQuery.FilterByColumn(filterColumn);
        }

        return await Paged(
          suppliesQuery.Select(s => s.AsSupplyDto()),
          pagedParams.PaginationParams
          );
    }
}
