using MediatR;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Wrappers;
using Ramsha.Domain.Suppliers.Entities;

namespace Ramsha.Application.Features.Suppliers.Queries.GetCurrentSupplierProductVariantList;

public class GetCurrentSupplierProductVariantListQuery : IRequest<BaseResult<List<SupplierVariantDto>>>
{
    public Guid ProductId { get; set; }
}
