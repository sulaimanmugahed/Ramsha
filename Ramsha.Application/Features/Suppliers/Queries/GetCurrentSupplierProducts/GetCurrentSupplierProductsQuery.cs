using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Suppliers.Queries.GetCurrentSupplierProducts;

public class GetCurrentSupplierProductsQuery : IRequest<BaseResult<List<SupplierProductDto>>>
{
    public PaginationParams PaginationParams { get; set; }
}
