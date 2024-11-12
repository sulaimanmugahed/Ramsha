using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Dtos.Supplies;
using Ramsha.Application.DTOs.Common;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Suppliers;
using Ramsha.Domain.Suppliers.Entities;

namespace Ramsha.Application.Contracts.Persistence;

public interface ISupplyRepository : IGenericRepository<Supply, SupplyId>
{
    Task<IEnumerable<Supply>> FindAllWithDetail(Expression<Func<Supply, bool>> criteria);
    Task<Supply?> GetWithDetails(Expression<Func<Supply, bool>> criteria);

    Task<PaginationResponseDto<SupplyDto>> GetSuppliesPaged(PagedParams pagedParams, Expression<Func<Supply, bool>>? criteria = null);

}
