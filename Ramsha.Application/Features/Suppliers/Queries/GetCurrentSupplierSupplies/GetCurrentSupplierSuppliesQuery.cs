using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Suppliers.Queries.GetSupplyRequestsBySupplier;

public class GetCurrentSupplierSuppliesQuery : PagedParams, IRequest<BaseResult<List<SupplyDto>>>
{

}
