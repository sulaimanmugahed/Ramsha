using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Ramsha.Application.Dtos.Orders;
using Ramsha.Application.DTOs.Common;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Orders;
using Ramsha.Domain.Orders.Entities;
using Ramsha.Domain.Suppliers;
using Ramsha.Domain.Suppliers.Entities;

namespace Ramsha.Application.Contracts.Persistence;

public interface IFulfillmentRequestRepository : IGenericRepository<FulfillmentRequest, FulfillmentRequestId>
{
    Task<PaginationResponseDto<FulfillmentRequestDto>> GetPaged(PaginationParams paginationParams, FilterParams? filterParams, SortingParams? sortingParams,Expression<Func<FulfillmentRequest, bool>>? criteria = null);
}
