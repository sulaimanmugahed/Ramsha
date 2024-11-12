
using MediatR;
using Ramsha.Application.Contracts.Persistence;
using Ramsha.Application.Dtos.Supplies;
using Ramsha.Application.Extensions;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Supplies.Queries.GetSupplyDetail;

public class GetSupplyDetailQueryHandler(
    ISupplyRepository supplyRepository
) : IRequestHandler<GetSupplyDetailQuery, BaseResult<SupplyDetailDto?>>
{
    public async Task<BaseResult<SupplyDetailDto?>> Handle(GetSupplyDetailQuery request, CancellationToken cancellationToken)
    {
        var supply = await supplyRepository.GetWithDetails(x => x.Id == new Domain.Suppliers.SupplyId(request.Id));
        if (supply is null)
            return new Error(ErrorCode.RequestedDataNotExist, "no supply with this id");

        return supply.AsSupplyDetailDto();
    }
}
