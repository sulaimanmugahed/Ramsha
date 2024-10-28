using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Suppliers.Entities;

namespace Ramsha.Application.Features.Suppliers.Queries.GetCurrentSupplierProductVariant;

public class GetCurrentSupplierProductVariantQuery : IRequest<BaseResult<SupplierVariantDto?>>
{
    public Guid ProductId { get; set; }
    public Guid VariantId { get; set; }

}
