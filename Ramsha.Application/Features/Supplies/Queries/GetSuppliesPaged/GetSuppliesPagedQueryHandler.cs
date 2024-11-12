using MediatR;
using Ramsha.Application.Contracts;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Dtos.Supplies;
using Ramsha.Application.Features.Suppliers.Queries.GetSuppliesPaged;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Supplies.Queries.GetSuppliesPaged;

public class GetSuppliesPagedQueryHandler(
    ISupplyRepository supplyRepository,
    IHttpService httpService
) : IRequestHandler<GetSuppliesPagedQuery, BaseResult<List<SupplyDto>>>
{
    public async Task<BaseResult<List<SupplyDto>>> Handle(GetSuppliesPagedQuery request, CancellationToken cancellationToken)
    {
        var response = await supplyRepository.GetSuppliesPaged(request);

        httpService.AddPagedHeader(response.MetaData);
        return response.Data;
    }
}
