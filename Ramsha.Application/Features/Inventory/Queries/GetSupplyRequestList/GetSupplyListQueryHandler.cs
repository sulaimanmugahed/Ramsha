
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Suppliers;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;
using MediatR;

namespace Ramsha.Application.Features.Inventory.Queries.GetSupplyRequestList;

public class GetSupplyRequestListQueryHandler(
    ISupplyRepository supplyRepository
) : IRequestHandler<GetSupplyListQuery, BaseResult<List<SupplyDto>>>
{
    public async Task<BaseResult<List<SupplyDto>>> Handle(GetSupplyListQuery request, CancellationToken cancellationToken)
    {
        var supplyRequests = await supplyRepository.FindAllWithDetail(x => x.Status == request.Status);
        return supplyRequests.Select(sr => sr.AsSupplyDto()).ToList();
    }
}
