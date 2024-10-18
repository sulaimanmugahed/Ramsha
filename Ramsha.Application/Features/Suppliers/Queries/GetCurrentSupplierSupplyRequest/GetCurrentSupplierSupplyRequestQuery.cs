using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Suppliers.Queries.GetCurrentSupplierSupplyRequest;

public class GetCurrentSupplierSupplyRequestQuery : IRequest<BaseResult<SupplyRequestDto?>>
{

}
