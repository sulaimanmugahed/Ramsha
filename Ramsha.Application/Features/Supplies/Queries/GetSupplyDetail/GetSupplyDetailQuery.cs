
using MediatR;
using Ramsha.Application.Dtos.Supplies;
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Features.Supplies.Queries.GetSupplyDetail;

public class GetSupplyDetailQuery : IRequest<BaseResult<SupplyDetailDto?>>
{
    public Guid Id { get; set; }
}
