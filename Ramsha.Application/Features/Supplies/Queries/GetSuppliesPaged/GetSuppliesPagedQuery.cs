using MediatR;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Dtos.Supplies;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Suppliers.Queries.GetSuppliesPaged;

public class GetSuppliesPagedQuery : PagedParams,IRequest<BaseResult<List<SupplyDto>>>
{

}
